// window:load event for Javascript to run after HTML
// because this Javascript is injected into the document head
ZC.LICENSE = ['569d52cefae586f634c54f86dc99e6a9', 'b55b025e438fa8a98e32482b5f768ff5'];

let rootId = 'start';
let series;
function getTreeObject(device) {
    return {
        id: device.deviceAddress,
        parent: rootId,
        name: `vendorId=${device.vendorId}: productId=${device.productId}`,
        value: `name=${device.deviceName}`,

    };
}
function initSeries(devices) {
    const hub = devices.find((device) => device.productId === 0);
    if (hub) {
        const item = getTreeObject(hub);
        item.parent = '';
        series = [item];
        rootId = hub.deviceAddress;
    } else {
        series = [{
            id: rootId,
            parent: '',
            name: 'start',
        }];
    }
}

function renderData() {
    const chartConfig = {
        type: 'tree',
        options: {
            link: {
                aspect: 'split',
            },
            maxSize: 15,
            minSize: 15,
            node: {
                type: 'circle',
                borderWidth: '0px',
                hoverState: {
                    borderAlpha: 1,
                    borderColor: '#000',
                    borderWidth: '2px',
                },
                label: {
                    width: '100px',
                },
            },
        },
        series,
    };
    zingchart.render({
        id: 'myChart',
        data: chartConfig,
        height: '95%',
        width: '100%',
        output: 'canvas',
    });

    // change tree layout
    document.getElementById('tree-aspect')
        .addEventListener('change', (e) => {
            chartConfig.options.aspect = e.srcElement.value;
            zingchart.exec('myChart', 'setdata', { data: chartConfig });
        });

    // change tree connector
    document.getElementById('tree-node')
        .addEventListener('change', (e) => {
            chartConfig.options.link.aspect = e.srcElement.value;
            zingchart.exec('myChart', 'setdata', { data: chartConfig });
        });

    // change node type
    document.getElementById('tree-node-shape')
        .addEventListener('change', (e) => {
            chartConfig.options.node.type = e.srcElement.value;
            zingchart.exec('myChart', 'setdata', { data: chartConfig });
        });
}

/**
 * @param {array<object>} devices
 */
function drewAllItems(devices) {
    initSeries(devices);
    const items = devices.filter((device) => device.productId);
    series.push(...items.map(getTreeObject));
    renderData();
}

/**
 * @param {object} device
 */
function addItemToChart(device) {
    series.push(getTreeObject(device));
    renderData();
    // zingchart.exec('myChart', 'tree.addnode', { data: getTreeObject(device) });
}

/**
 * @param {object} device
 */
function removeItemFromChart(device) {
    const index = series.findIndex((s) => s.id === device.deviceAddress);
    if (index !== -1) {
        series.splice(index, 1);
    }
    renderData();
    // zingchart.exec('myid', 'tree.removenode', { id: `${device.deviceAddress}` });
}
