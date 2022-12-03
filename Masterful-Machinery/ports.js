//librarys
const { readFile, mkdirSync, existsSync } = require('fs');
const fsp = require('fs/promises');

// make sure the output directory exists
var dir = __dirname + '/output';
if (!existsSync(dir)) {
    mkdirSync(dir, 0744);
}
const _file = process.argv[2]

var configTypes = {
    item: item,
    fluid: fluid,
    energy: energy,
    rotation: stress,
    mek_gas: mek_gas,
    mek_laser: mek_laser,
    mek_heat: mek_heat,
    mek_infuse: mek_infuse,
    mek_pigment: mek_pigment,
    mek_slurry: mek_slurry
}

function ports(file) {
    console.log(`Starting Port Creation`);
    //reads the input file
    readFile(file, async (err, data) => {
        //catch errors
        if (err) {
            await fsp.writeFile(file, _example);
            console.error(err);
            await fsp.writeFile("err.txt", err);
            process.exit(1);
        }
        //arrays input to multi level array 
        let _array = data.toString().replace(/: /gi, ':').replace(/\r\n/, '\n').split('\n');
        for (let i = 0; i < _array.length; i++) {
            _array[i] = _array[i].split(":");
        }
        console.log(_array)
        _array.forEach(async e => {
            let mat = e[2];
            let type = e[0];
            var config = configTypes[type.toLocaleLowerCase()]
            let size = e[1];
            let _fileout = `${size.toLowerCase().replace(" ", '_')}_${type.toLowerCase()}_${mat.toLowerCase()}`

            //Actual Script Builder
            let obj = {
                size,
                mat,
                type,
                config: config(e),
                io: "true"
            };

            
            await fsp.writeFile(`output/${_fileout}_input.json`, whackAPort(obj));
            if (type.toLowerCase() != "mek_laser") {
                obj.io = "false"
                await fsp.writeFile(`output/${_fileout}_output.json`, whackAPort(obj));
            }

        });
    });
}

function capacity(config) {
    return `{
        "capacity": ${config[3]}
    }`
}

function item(config) {
    return `{
        "slotRows":config. ${config[3]},
        "slotCols":config. ${config[4]}
    }`
}

function fluid(config) {
    return capacity(config)
}

function energy(config) {
    return capacity(config)
}

function stress(config) {
    return `{
        "stress": ${config[3]}
    }`
}

function mek_gas(config) {
    return capacity(config)
}

function mek_laser() {
    return `{
    }`
}

function mek_heat(config) {
    return capacity(config)
}

function mek_infuse(config) {
    return capacity(config)
}

function mek_pigment(config) {
    return capacity(config)
}

function mek_slurry(config) {
    return capacity(config)
}

function whackAPort(port) {
    return `{
    "id": "${port.size.toLocaleLowerCase().replace(" ", "_")}_${port.mat.toLocaleLowerCase()}_item_input",
    "name": {
      "text": "${port.size} ${port.mat} Input"
    },
    "port": "mm:${port.mat.toLocaleLowerCase()}",
    "input": ${port.io},
    "config": ${port.config}
}`
}

ports(_file)