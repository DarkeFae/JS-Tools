//libraries to include
const { readFile, writeFile, fstat } = require('fs')
const fsp = require('fs/promises')

const _file = process.argv[2]
const _example = `DELETE THIS DATA BEFORE RUNNING AGAIN

Please enter your data in the following format
Size:Material:Type:Capacity/Rows/Stress:Columns for Item(Optional)
--------------------------------------------`


function ports(file) {
    console.log(`Starting Port Creation`);
    //reads the input file
    readFile(file, async (err, data) => {
        //catch errors
        if (err) {
            await fsp.writeFile(file, _example);
            console.error(err);
            process.exit(1);
        }
        //arrays input to multi level array 
        var _array = data.toString().replace(/: /gi, ':').split('\r\n');
        for (var i = 0; i < _array.length; i++) {
            _array[i] = _array[i].split(":");
        }
        //console.log(_array)
        _array.forEach(async e => {
            var size = e[0];
            var mat = e[1];
            var type = e[2];
            var capacity = e[3];
            var size1 = e[3];
            var size2 = e[4];
            var output = `${size.toLowerCase().replace(" ", '_')}_${mat.toLowerCase()}_${type.toLowerCase()}`
            switch (type.toLowerCase()) {
                case 'item':
                    //item ports
                    var _itemInput = `{
  "id": "${size.toLowerCase().replace(" ", "_")}_${mat.toLowerCase()}_item_input",
  "name": {
    "text": "${size} ${mat} Input"
  },
  "port": "mm:item",
  "input": true,
  "config": {
    "slotRows": ${size1},
    "slotCols": ${size2}
  }
}`
                    var _itemOutput = `{
  "id": "${size.toLowerCase().replace(" ", "_")}_${mat.toLowerCase()}_item_input",
  "name": {
    "text": "${size} ${mat} Input"
  },
  "port": "mm:item",
  "input": false,
  "config": {
    "slotRows": ${size1},
    "slotCols": ${size2}
  }
}`

                    await fsp.writeFile(`output/${output}_input.json`, _itemInput);
                    await fsp.writeFile(`output/${output}_output.json`, _itemOutput);
                    break;
                case 'fluid':
                    //fluid ports
                    var _fluidInput = `{
  "id": "${size.toLowerCase().replace(" ", "_")}_${mat.toLowerCase()}_fluid_input",
  "name": {
    "text": "${size} ${mat} Fluid Input"
  },
  "port": "mm:fluid",
  "input": true,
  "config": {
    "capacity": ${capacity}
  }
}`
                    var _fluidOutput = `{
  "id": "${size.toLowerCase().replace(" ", "_")}_${mat.toLowerCase()}_fluid_output",
  "name": {
    "text": "${size} ${mat} Fluid Output"
  },
  "port": "mm:fluid",
  "input": false,
  "config": {
    "capacity": ${capacity}
  }
}`

                    await fsp.writeFile(`output/${output}_input.json`, _fluidInput,);
                    await fsp.writeFile(`output/${output}_output.json`, _fluidOutput);
                    break;
                case 'energy':
                    //energy ports
                    var _energyInput = `{
  "id": "${size.toLowerCase().replace(" ", "_")}_${mat.toLowerCase()}_energy_input",
  "name": {
    "text": "${size} ${mat} Energy Input"
  },
  "port": "mm:energy",
  "input": true,
  "config": {
    "capacity": ${capacity}
  }
}`
                    var _energyOutput = `{
  "id": "${size.toLowerCase().replace(" ", "_")}_${mat.toLowerCase()}_energy_output",
  "name": {
    "text": "${size} ${mat} Energy Output"
  },
  "port": "mm:energy",
  "input": false,
  "config": {
    "capacity": ${capacity}
  }
}`

                    await fsp.writeFile(`output/${output}_input.json`, _energyInput,);
                    await fsp.writeFile(`output/${output}_output.json`, _energyOutput);
                    break;
                case 'rotation':
                    //rotation ports
                    var _rotInput = `{
  "id": "rot_input",
  "name": {
    "text": "${size} ${mat} Rotation Input"
  },
  "port": "mm:create_rotation",
  "input": true,
  "config": {
    "stress": ${capacity}
  }
}`
                    var _rotOutput = `{
  "id": "rot_output",
  "name": {
    "text": "${size} ${mat} Rotation Output"
  },
  "port": "mm:create_rotation",
  "input": false,
  "config": {
    "stress": ${capacity}
  }
}`

                    await fsp.writeFile(`output/${output}_input.json`, _rotInput,);
                    await fsp.writeFile(`output/${output}_output.json`, _rotOutput);
                    break;
                case "mek_gas":
                    //mek_gas ports
                    var _gasInput = `{
  "id": "${size.toLowerCase().replace(" ", "_")}_${mat.toLowerCase()}_mek_gas_input",
  "name": {
    "text": "${size} ${mat} Gas Input"
  },
  "port": "mm:mekanism_gas",
  "input": true,
  "config": {
    "capacity": ${capacity}
  }
}`
                    var _gasOutput = `{
  "id": "${size.toLowerCase().replace(" ", "_")}_${mat.toLowerCase()}_mek_gas_output",
  "name": {
    "text": "${size} ${mat} Gas Output"
  },
  "port": "mm:mekanism_gas",
  "input": false,
  "config": {
    "capacity": ${capacity}
  }
}`

                    await fsp.writeFile(`output/${output}_input.json`, _gasInput,);
                    await fsp.writeFile(`output/${output}_output.json`, _gasOutput);
                    break;
                default:
                    console.error(`Unknown Port Type: ${e[2]}`);
                    break;
            }
        })

    });

}
ports(_file)