# Custom Block Generators for <a href="https://www.curseforge.com/minecraft/mc-mods/masterful-machinery">Masterful Machinery</a> for Minecraft 1.18.2


## ports.js
This is a nodejs file to create the ports you need for your modpack.

Create a .txt file in the same folder as ports.js with the layout below and run "node ports.js [your input file]"  
This will automatically generate the both input and output port files in a subfolder called "output"
<br><br>
## Ports Layout:
Most of the variables will be the same between port types with only the 4th and 5th sections having much differnce.

the basic file layout is 

    Port:Number:One:Of:Many
    Port:Number:Two:Of:Many
    And:So:It:Goes:On

## Items:
Item:Size:Material:Rows:Columns

for example: `Item:Large:Brass:3:3` is a Item Port with the name Large Brass Item Port and an inventory size of 3x3.

## Fluids:
Fluid:Size:Material:Amount

for example: `Fluid:Large:Brass:1000` is a Fluid Port with the name Large Brass Fluid Port and an Tank size of 1000mB or 1 Bucket.

## Energy:
Energy:Size:Material:Amount

for example: `Energy:Large:Brass:256` is a Energy Port with the name Large Brass Energy Port and an Battery size of 256FE.

## Create Rotation:
Rotation:Size:Material:Stress

for example: `Rotation:Large:Brass:30` is a Create Rotation Port with the name Large Brass Rotation Port and an Stress Capacity of 30 SU

## Mekanism Gas:
Mek_Gas:Size:Material:Amount

for example: `Mek_Gas:Large:Brass:100` is a Mekanism Gas Port with the name Large Brass Gas Port and an Tank size of 100mB.

## Mekanism Laser
Mek_Laser:Material

for example: `Mek_Laser:Brass` is a Mekanism Laser Input with the name Brass Laser Port.<br>
<mark style= "background-color: #403A39"> Note that Mekanism Lasers are input only so only the input will be generated. </mark>

# TODO
## Mekanism_Heat
Mek_Heat:Size:Material:Amount

for example: `Mek_Heat:Large:Brass:100` is a Mekanism Heat Port with the name Large Brass Heat Port and an Tank size of 100mB.

## Mekanism_Infuse Type
Mek_Infuse:Size:Material:Amount

for example: `Mek_Infuse:Large:Brass:100` is a Mekanism Infuse Port with the name Large Brass Infuse Port and an Tank size of 100mB.

## Mekanism_Pigment
Mek_Pigment:Size:Material:Amount

for example: `Mek_Pigment:Large:Brass:100` is a Mekanism Pigment Port with the name Large Brass Pigment Port and an Tank size of 100mB.

## Mekanism_Slurry
Mek_Slurry:Size:Material:Amount

for example: `Mek_Slurry:Large:Brass:100` is a Mekanism Slurry Port with the name Large Brass Slurry Port and an Tank size of 100mB.

###### Information on this page is subject to change with mod updates