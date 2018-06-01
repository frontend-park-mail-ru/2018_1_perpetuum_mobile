class VkButton {
    constructor() {
        const vk = document.getElementsByClassName('js-vk')[0];
        vk.innerHTML = VK.Share.button({
            url: 'https://blendocu.com',
            title: 'Поделись Blendocu :)',
            description: 'The game of color',
        }, {type: 'custom', text: 'VK'});

        const btn = vk.getElementsByTagName('a')[0];
        btn.classList.add('wrapper-block__vk-inner');
    }
}


export {VkButton};