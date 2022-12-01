//libraries to include
const { readFile, mkdirSync, existsSync } = require('fs')
const fsp = require('fs/promises')


const _file = process.argv[2]
const _example = `DELETE THIS DATA BEFORE RUNNING AGAIN

Please enter your data in the following format
Type:Size:Material:Capacity/Rows/Stress:Columns for Item(Optional)
--------------------------------------------`

var dir = __dirname + '/output';
if (!existsSync(dir)) {
  mkdirSync(dir, 0744);
}


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
        var _array = data.toString().replace(/: /gi, ':').replace(/\r\n/, '\n').split('\n');
        for (var i = 0; i < _array.length; i++) {
             _array[i] = _array[i].split(":");
        }
        console.log(_array)
        _array.forEach(async e => {
            var size = e[1];
            var mat = e[2];
            var type = e[0];
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

                case "mek_laser":
                //Mekanism Laser Input Only
                var _laserInput = `{
  "id": "${mat.toLowerCase()}_mek_laser",
  "name": {
    "text": "${mat} Laser Port"
  },
  "port": "mm:mekanism_laser",
  "input": true,
  "config": {
  }
}`

                await fsp.writeFile(`output/${mat}_laser_port.json`, _laserInput,);
                break;

                case "mek_heat":
                  //Mekanism Heat
                  var _heatInput = `{
  "id": "${size.toLowerCase().replace(" ", "_")}_${mat.toLowerCase()}_mek_heat_input",
  "name": {
    "text": "${size} ${mat} Heat Input"
  },
  "port": "mm:mekanism_heat",
  "input": true,
  "config": {
    "capacity": ${capacity}
  }
}`
                  var _heatOutput = `{
  "id": "${size.toLowerCase().replace(" ", "_")}_${mat.toLowerCase()}_mek_heat_output",
  "name": {
    "text": "${size} ${mat} Heat Output"
  },
  "port": "mm:mekanism_heat",
  "input": false,
  "config": {
    "capacity": ${capacity}
  }
}`

                    await fsp.writeFile(`output/${output}_input.json`, _heatInput,);
                    await fsp.writeFile(`output/${output}_output.json`, _heatOutput);
                break;

                case "mek_infuse":
                //Mekanism Infuse
                var _infuseInput = `{
  "id": "${size.toLowerCase().replace(" ", "_")}_${mat.toLowerCase()}_mek_infuse_input",
  "name": {
    "text": "${size} ${mat} Infuse Input"Heat
  },
  "port": "mm:mekanism_infuse",
  "input": true,
  "config": {
    "capacity": ${capacity}
  }
}`
                var _infuseOutput = `{
  "id": "${size.toLowerCase().replace(" ", "_")}_${mat.toLowerCase()}_mek_infuse_output",
  "name": {
    "text": "${size} ${mat} Infuse Output"
  },
  "port": "mm:mekanism_infuse",
  "input": false,
  "config": {
    "capacity": ${capacity}
  }
}`
                
                await fsp.writeFile(`output/${output}_input.json`, _infuseInput,);
                await fsp.writeFile(`output/${output}_output.json`, _infuseOutput);
                break;

                case "mek_pigment":
                  //Mekanism Pigment
                  var _pigmentInput = `{
  "id": "${size.toLowerCase().replace(" ", "_")}_${mat.toLowerCase()}_mek_pigment_input",
  "name": {
    "text": "${size} ${mat} Pigment Input"
  },
  "port": "mm:mekanism_pigment",
  "input": true,
  "config": {
    "capacity": ${capacity}
  }
}`
                  var _pigmentOutput = `{
  "id": "${size.toLowerCase().replace(" ", "_")}_${mat.toLowerCase()}_mek_pigment_output",
  "name": {
    "text": "${size} ${mat} Pigment Output"
  },
  "port": "mm:mekanism_pigment",
  "input": false,
  "config": {
    "capacity": ${capacity}
  }
}`
                                  
                  await fsp.writeFile(`output/${output}_input.json`, _pigmentInput,);
                  await fsp.writeFile(`output/${output}_output.json`, _pigmentOutput);
                break;

                case "mek_slurry":
                  //Mekanism Slurry
                  var _slurryInput = `{
  "id": "${size.toLowerCase().replace(" ", "_")}_${mat.toLowerCase()}_mek_slurry_input",
  "name": {
    "text": "${size} ${mat} Slurry Input"
  },
  "port": "mm:mekanism_slurry",
  "input": true,
  "config": {
    "capacity": ${capacity}
  }
}`
                  var _slurryOutput = `{
  "id": "${size.toLowerCase().replace(" ", "_")}_${mat.toLowerCase()}_mek_slurry_output",
  "name": {
    "text": "${size} ${mat} Slurry Output"
  },
  "port": "mm:mekanism_slurry",
  "input": false,
  "config": {
    "capacity": ${capacity}
  }
}`
                                  
                  await fsp.writeFile(`output/${output}_input.json`, _slurryInput,);
                  await fsp.writeFile(`output/${output}_output.json`, _slurryOutput);
                break;
                default:
                    console.error(`Unknown Port Type: ${e[0]}`);
                    break;
            }
        })

    });

}
ports(_file)