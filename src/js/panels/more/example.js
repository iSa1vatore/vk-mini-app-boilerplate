import React from 'react';
import {connect} from 'react-redux';

import {goBack} from '../../store/router/actions';
import {setFormData} from "../../store/formData/actions";

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

    constructor(props) {
        super(props);

        let defaultInputData = {
            workplace: '',
            workposition: '',

            checkboxPhoto: 0,
            checkboxOnline: 0
        };

        this.state = {
            inputData: props.inputData['example_form'] || defaultInputData
        };

        this.handleInput = (e) => {
            let value = e.currentTarget.value;

            if (e.currentTarget.type === 'checkbox') {
                value = e.currentTarget.checked;
            }

            this.setState({
                inputData: {
                    ...this.state.inputData,
                    [e.currentTarget.name]: value
                }
            })
        };

        this.clearForm = () => {
            this.setState({
                inputData: defaultInputData
            });
        };
    }

    componentWillUnmount() {
        this.props.setFormData('example_form', this.state.inputData);
    }

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
                            <Input value={this.state.inputData.workplace}
                                   onChange={this.handleInput}
                                   name="workplace"
                                   placeholder="Место работы"
                                   autoComplete="off"/>
                            <Input value={this.state.inputData.workposition}
                                   onChange={this.handleInput}
                                   name="workposition"
                                   placeholder="Должность"
                                   autoComplete="off"/>
                        </FormLayoutGroup>
                        <FormLayoutGroup top="Дополнительно">
                            <Checkbox checked={this.state.inputData.checkboxPhoto}
                                      onChange={this.handleInput}
                                      name="checkboxPhoto"
                            >С фотографией</Checkbox>
                            <Checkbox checked={this.state.inputData.checkboxOnline}
                                      onChange={this.handleInput}
                                      name="checkboxOnline"
                            >Сейчас на сайте</Checkbox>
                        </FormLayoutGroup>
                    </FormLayout>
                    <Div className="buttons-group">
                        <Button size="l" stretched={true} onClick={() => goBack()}>Сохранить</Button>
                        <Button size="l" stretched={true} onClick={this.clearForm}>Очистить</Button>
                    </Div>
                </Group>
            </Panel>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        inputData: state.formData.forms,
    };
};

const mapDispatchToProps = {
    setFormData,
    goBack
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePanelProfile);