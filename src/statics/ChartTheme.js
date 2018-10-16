var colorPalette = [
    '#488fdf', '#e6b600', '#0098d9', '#2b821d',
    '#005eaa', '#339ca8', '#cda819', '#32a487'
];

export default {

    color: colorPalette,

    visualMap: {
        color: ['#1790cf', '#a2d4e6']
    },

    toolbox: {
        iconStyle: {
            normal: {
                borderColor: '#06467c'
            }
        }
    },

    tooltip: {
        backgroundColor: 'rgba(0,0,0,0.6)'
    },

    dataZoom: {
        dataBackgroundColor: '#dedede',
        fillerColor: 'rgba(154,217,247,0.2)',
        handleColor: '#005eaa'
    },

    timeline: {
        lineStyle: {
            color: '#005eaa'
        },
        controlStyle: {
            normal: {
                color: '#005eaa',
                borderColor: '#005eaa'
            }
        }
    },

    candlestick: {
        itemStyle: {
            normal: {
                color: '#c12e34',
                color0: '#2b821d',
                lineStyle: {
                    width: 1,
                    color: '#c12e34',
                    color0: '#2b821d'
                }
            }
        }
    },

    graph: {
        color: colorPalette
    }
};
