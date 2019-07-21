import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {goBack, openPopout, closePopout, openModal} from "../../store/router/actions";
import * as VK from '../../services/VK';

import {renderGroupsList} from '../../services/renderers';

import Div from '@vkontakte/vkui/dist/components/Div/Div';
import List from '@vkontakte/vkui/dist/components/List/List';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelSpinner from '@vkontakte/vkui/dist/components/PanelSpinner/PanelSpinner';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';

class HomePanelProfile extends React.Component {

    state = {
        groups: {
            admined: [],
            other: [],
        },
        loading: true,
        errorGetAuthToken: false
    };

    componentDidMount() {
        if (this.props.accessToken === undefined) {
            this.getAuthToken();
        } else {
            this.getGroupsList();
        }
    }

    getAuthToken() {
        this.props.dispatch(VK.getAuthToken(['groups']));
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.accessToken === null) {
            this.setState({
                loading: false,
                errorGetAuthToken: true
            });
        } else {
            this.setState({
                loading: true,
                errorGetAuthToken: false
            });

            this.getGroupsList();
        }
    }

    async getGroupsList() {
        if (localStorage.getItem('userGroupsAdmined') && localStorage.getItem('userGroupsOther')) {
            this.setState({
                groups: {
                    admined: JSON.parse(localStorage.getItem('userGroupsAdmined')),
                    other: JSON.parse(localStorage.getItem('userGroupsOther')),
                },
                loading: false
            });

            return;
        }

        let groups = await VK.groupsGet();

        let adminedGrouos = groups.items.filter(function (item) {
            return item.is_admin === 1;
        });

        let otherGrouos = groups.items.filter(function (item) {
            return item.is_admin === 0;
        });

        localStorage.setItem('userGroupsAdmined', JSON.stringify(adminedGrouos));
        localStorage.setItem('userGroupsOther', JSON.stringify(otherGrouos));

        this.setState({
            groups: {
                admined: adminedGrouos,
                other: otherGrouos
            },
            loading: false
        });
    }

    render() {
        const {id, goBack} = this.props;

        let adminedGroupsList = renderGroupsList(this.state.groups.admined);
        let otherGroupsList = renderGroupsList(this.state.groups.other);

        return (
            <Panel id={id}>
                <PanelHeader
                    left={<PanelHeaderBack onClick={() => goBack()}/>}
                >
                    Группы
                </PanelHeader>
                {this.state.loading && <PanelSpinner/>}
                {!this.state.loading && this.state.errorGetAuthToken && <Group>
                    <Div>Возникла ошибка при получении данных, возможно Вы не выдали права на список групп.</Div>
                    <Div>
                        <Button size="l" stretched={true} onClick={() => this.getAuthToken()}>Запросить
                            повторно</Button>
                    </Div>
                </Group>}
                {!this.state.loading && !this.state.errorGetAuthToken && adminedGroupsList &&
                <Group title="Администрируемые">
                    <List>
                        {adminedGroupsList}
                    </List>
                </Group>}
                {!this.state.loading && !this.state.errorGetAuthToken && otherGroupsList &&
                <Group title="Остальные">
                    <List>
                        {otherGroupsList}
                    </List>
                </Group>}
            </Panel>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({goBack, openPopout, closePopout, openModal}, dispatch)
    }
}

const mapStateToProps = (state) => {
    return {
        accessToken: state.vkui.accessToken
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePanelProfile);