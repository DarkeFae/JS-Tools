# Custom Block Generators for <a href="https://www.curseforge.com/minecraft/mc-mods/masterful-machinery">Masterful Machinery</a> for Minecraft 1.18.2


## ports.js
This is a nodejs file to create the ports you need for your modpack.

Create a .txt file in the same folder as ports.js with the layout below and run "node ports.js [your input file]"  
This will automatically generate the both input and output port files in a subfolder called "output"
<br><br>
## Ports Layout:
Most of the variables will be the same between port types with only the 4th and 5th sections having much differnce.

## Items:
Size:Material:Item:Rows:Columns

for example: `Large:Brass:Item:3:3` is a Item Port with the name Large Brass Item Port and an inventory size of 3x3.

## Fluids:
Size:Material:Fluid:Amount

for example: `Large:Brass:Fluid:1000` is a Fluid Port with the name Large Brass Fluid Port and an Tank size of 1000mB or 1 Bucket.

## Energy:
Size:Material:Energy:Amount

for example: `Large:Brass:Energy:256` is a Energy Port with the name Large Brass Energy Port and an Battery size of 256FE.

## Create Rotation:
Size:Material:Rotation:Stress

for example: `Large:Brass:Rotation:30` is a Create Rotation Port with the name Large Brass Rotation Port and an Stress Capacity of 30 SU

## Mekanism Gas:
Size:Material:Mek_Gas:Amount

for example: `Large:Brass:Mek_Gas:100` is a Mekanism Gas Port with the name Large Brass Gas Port and an Tank size of 100mB.