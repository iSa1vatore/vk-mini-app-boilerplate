import React from 'react';
import {connect} from 'react-redux';

import {setPage} from "../../store/router/actions";

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import CellButton from '@vkontakte/vkui/dist/components/CellButton/CellButton';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';

class HomePanelProfile extends React.Component {

    render() {
        const {id, setPage} = this.props;

        return (
            <Panel id={id}>
                <PanelHeader>Examples 2</PanelHeader>
                <Group>
                    <CellButton onClick={() => setPage('modal', 'filters')}>
                        Открыть модальное окно
                    </CellButton>
                </Group>
            </Panel>
        );
    }

}

const mapDispatchToProps = {
    setPage
};

export default connect(null, mapDispatchToProps)(HomePanelProfile);