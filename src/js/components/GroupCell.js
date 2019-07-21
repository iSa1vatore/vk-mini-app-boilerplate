import React, {PureComponent} from 'react';

import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';

class GroupCell extends PureComponent {

    render() {
        const {description, photo, name} = this.props;

        let desc = description.length > 0 ? description : "Описание отсутствует";

        return (
            <Cell
                description={desc}
                before={<Avatar size={40} src={photo}/>}
            >
                {name}
            </Cell>
        )
    }

}

export default GroupCell;