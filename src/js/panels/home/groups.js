import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {goBack, openPopout, closePopout, openModal} from "../../store/router/actions";
import * as VK from '../../services/VK';

import {renderGroupsList} from '../../services/renderers';

import {Div, List, Panel, Group, Button, PanelHeader, PanelSpinner, PanelHeaderBack, Header} from "@vkontakte/vkui";

class HomePanelGroups extends React.Component {

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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props !== prevProps) {
            if (this.props.accessToken === null) {
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

        let adminedGroups = groups.items.filter(function (item) {
            return item.is_admin === 1;
        });

        let otherGroups = groups.items.filter(function (item) {
            return item.is_admin === 0;
        });

        localStorage.setItem('userGroupsAdmined', JSON.stringify(adminedGroups));
        localStorage.setItem('userGroupsOther', JSON.stringify(otherGroups));

        this.setState({
            groups: {
                admined: adminedGroups,
                other: otherGroups
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
                <Group header={
                    <Header mode="secondary">Администрируемые</Header>
                }>
                    <List>
                        {adminedGroupsList}
                    </List>
                </Group>}
                {!this.state.loading && !this.state.errorGetAuthToken && otherGroupsList &&
                <Group header={
                    <Header mode="secondary">Остальные</Header>
                }>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePanelGroups);
