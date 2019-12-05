// two.js
// hello.js
import React, {Component} from 'react'; // 这两个模块必须引入

let newName = '我是第二个入口文件';

export default class Hello extends Component{
    render() {
        return (
            <div>
                {newName}
            </div>
        );
    }
}