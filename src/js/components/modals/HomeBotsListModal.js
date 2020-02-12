import React from 'react';
import {connect} from 'react-redux';

import {openModal} from "../../store/router/actions";

import {List, Cell, Avatar, ModalPage, ModalPageHeader, PanelHeaderButton, withPlatform, IOS} from "@vkontakte/vkui";

import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Chevron from '@vkontakte/icons/dist/24/chevron';

const bots = [
    {
        name: 'VKS',
        avatar: 'https://pp.userapi.com/c851520/v851520442/48ce/Sik7V4c58qw.jpg',
        desc: 'Нет, меня не роняли в детстве'
    },
    {
        name: 'Недобот',
        avatar: 'https://pp.userapi.com/c854420/v854420431/da51/X8ohw4-4Fk4.jpg',
        desc: 'Я ни разу не пил кокосовое молоко'
    },
    {
        name: 'Realm of War',
        avatar: 'https://sun9-72.userapi.com/c853520/v853520591/1f167d/avj_z9yFtQA.jpg?ava=1',
        desc: 'Ненавижу спойлеры.'
    },
];

class HomeBotsListModal extends React.Component {

    render() {
        const {id, onClose, openModal, platform} = this.props;

        return (
            <ModalPage
                id={id}
                header={
                    <ModalPageHeader
                        left={platform !== IOS &&
                        <PanelHeaderButton onClick={onClose}><Icon24Cancel/></PanelHeaderButton>}
                        right={platform === IOS &&
                        <PanelHeaderButton onClick={onClose}><Icon24Dismiss/></PanelHeaderButton>}
                    >
                        /appbots на минималках
                    </ModalPageHeader>
                }
                onClose={onClose}
                settlingHeight={80}
            >
                <List>
                    {bots.map((bot, index) => (
                        <Cell
                            key={index}
                            description={bot.desc}
                            before={<Avatar size={40} src={bot.avatar}/>}
                            onClick={() => openModal('MODAL_PAGE_BOT_INFO')}
                            asideContent={<Icon24Chevron fill="#528bcc"/>}
                        >
                            {bot.name}
                        </Cell>
                    ))}
                </List>
            </ModalPage>
        );
    }

}

const mapDispatchToProps = {
    openModal
};

export default withPlatform(connect(null, mapDispatchToProps)(HomeBotsListModal));
