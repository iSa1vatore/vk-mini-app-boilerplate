import React from 'react';
import {connect} from 'react-redux';

import {goBack} from '../../store/router/actions';

import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Checkbox from '@vkontakte/vkui/dist/components/Checkbox/Checkbox';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import FormLayoutGroup from '@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack';

class HomePanelProfile extends React.Component {

    render() {
        const {id, goBack} = this.props;

        return (
            <Panel id={id}>
                <PanelHeader
                    left={<PanelHeaderBack onClick={() => goBack()}/>}
                >
                    Модальное окно
                </PanelHeader>
                <Group>
                    <FormLayout>
                        <FormLayoutGroup top="Работа">
                            <Input placeholder="Место работы"/>
                            <Input placeholder="Должность"/>
                        </FormLayoutGroup>
                        <FormLayoutGroup top="Дополнительно">
                            <Checkbox>С фотографией</Checkbox>
                            <Checkbox>Сейчас на сайте</Checkbox>
                        </FormLayoutGroup>
                    </FormLayout>
                    <Div>
                        <Button size="l" stretched={true} onClick={() => goBack()}>Сохранить</Button>
                    </Div>
                </Group>
            </Panel>
        );
    }

}

const mapDispatchToProps = {
    goBack
};

export default connect(null, mapDispatchToProps)(HomePanelProfile);