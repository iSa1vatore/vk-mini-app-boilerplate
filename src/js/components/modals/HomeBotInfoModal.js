import React from 'react';
import {connect} from 'react-redux';

import {Cell, List, Avatar, InfoRow, ModalPage, ModalPageHeader, HeaderButton, IS_PLATFORM_IOS} from "@vkontakte/vkui";

import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';

class HomeBotsListModal extends React.Component {

    render() {
        const {id, onClose} = this.props;

        return (
            <ModalPage
                id={id}
                header={
                    <ModalPageHeader
                        left={!IS_PLATFORM_IOS &&
                        <HeaderButton onClick={onClose}><Icon24Cancel/></HeaderButton>}
                        right={IS_PLATFORM_IOS &&
                        <HeaderButton onClick={onClose}><Icon24Dismiss/></HeaderButton>}
                    >
                        Информация о боте
                    </ModalPageHeader>
                }
                onClose={onClose}
                settlingHeight={80}
            >
                <Cell
                    description="Описание"
                    before={<Avatar size={40} src="https://vk.com/images/community_100.png?ava=1"/>}
                >
                    Название
                </Cell>
                <List>
                    <Cell>
                        <InfoRow title="Подписчиков">
                            8800
                        </InfoRow>
                    </Cell>
                    <Cell>
                        <InfoRow title="Записей">
                            555
                        </InfoRow>
                    </Cell>
                    <Cell>
                        <InfoRow title="Рейтинг">
                            3535
                        </InfoRow>
                    </Cell>
                </List>
            </ModalPage>
        );
    }

}

export default connect()(HomeBotsListModal);