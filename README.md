<img src="./src/icon.svg?rand=2319" width="100" /><br>
# Boids
<i>Simulated flocking movement based on Craig Reynolds' boids model - http://www.red3d.com/cwr/boids/</i> <br>
### Version 2.0.0.5

[<img src="https://placehold.co/200x50/4493f8/FFF?text=Download&font=montserrat" width="200"/>](https://github.com/skymen/boids_sdkv2/releases/download/skymenBoids-2.0.0.5.c3addon/skymenBoids-2.0.0.5.c3addon)
<br>
<sub> [See all releases](https://github.com/skymen/boids_sdkv2/releases) </sub> <br>

---
<b><u>Author:</u></b> Alastair Aitchison & skymen <br>
<b>[Documentation](https://www.construct.net/en/make-games/addons/530/boids/documentation)</b>  <br>
<sub>Made using [CAW](https://marketplace.visualstudio.com/items?itemName=skymen.caw) </sub><br>

## Table of Contents
- [Usage](#usage)
- [Examples Files](#examples-files)
- [Properties](#properties)
- [Actions](#actions)
- [Conditions](#conditions)
- [Expressions](#expressions)
---
## Usage
To build the addon, run the following commands:

```
npm i
npm run build
```

To run the dev server, run

```
npm i
npm run dev
```

## Examples Files

---
## Properties
| Property Name | Description | Type |
| --- | --- | --- |
| Max speed | The max speed value | integer |
| Max force | The max force value | integer |
| Set angle | The angle behavior | check |


---
## Actions
| Action | Description | Params
| --- | --- | --- |
| Flock | Flock behavior | Target X             *(number)* <br>Target Y             *(number)* <br>Flock with             *(object)* <br>Target priority             *(number)* <br>Seperation priority             *(number)* <br>Alignment priority             *(number)* <br>Cohesion priority             *(number)* <br>Seperation distance             *(number)* <br>Distance cut-off             *(number)* <br> |
| Set angle | Set the angle | Set Angle             *(boolean)* <br> |
| Set max force | Set the max force value | Max force             *(number)* <br> |
| Set max speed | Set the max speed value | Max speed             *(number)* <br> |


---
## Conditions
| Condition | Description | Params
| --- | --- | --- |
| Is angle set | Is the angle set |  |


---
## Expressions
| Expression | Description | Return Type | Params
| --- | --- | --- | --- |
| IsAngleSet | 1 if angle is set, 0 otherwise | number |  | 
| MaxForce | The max force value | number |  | 
| MaxSpeed | The max speed value | number |  | 
