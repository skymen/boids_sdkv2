import { action, condition, expression } from "../template/aceDefine.js";

const category = "steering_behaviours";

expression(
  category,
  "MaxSpeed",
  {
    id: "maxspeed",
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "The max speed value",
    params: [],
  },
  function () {
    return this.maxSpeed;
  },
  false
);
expression(
  category,
  "MaxForce",
  {
    id: "maxforce",
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "The max force value",
    params: [],
  },
  function () {
    return this.maxForce;
  },
  false
);
expression(
  category,
  "IsAngleSet",
  {
    id: "isangleset",
    highlight: false,
    deprecated: false,
    returnType: "number",
    description: "1 if angle is set, 0 otherwise",
    params: [],
  },
  function () {
    return this.setAngle ? 1 : 0;
  },
  false
);

condition(
  category,
  "IsAngleSet",
  {
    id: "isangleset",
    highlight: false,
    deprecated: false,
    listName: "Is angle set",
    displayText: "Is angle set",
    description: "Is the angle set",
    params: [],
  },
  function () {
    return this.setAngle;
  },
  false
);

action(
  category,
  "SetMaxSpeed",
  {
    id: "setmaxspeed",
    highlight: false,
    deprecated: false,
    listName: "Set max speed",
    displayText: "{my}: Set max speed to {0}",
    description: "Set the max speed value",
    params: [
      {
        id: "speed",
        name: "Max speed",
        desc: "The max speed value",
        type: "number",
        initialValue: "",
      },
    ],
  },
  function (maxSpeed) {
    this.maxSpeed = maxSpeed;
  },
  false
);

action(
  category,
  "SetMaxForce",
  {
    id: "setmaxforce",
    highlight: false,
    deprecated: false,
    listName: "Set max force",
    displayText: "{my}: Set max force to {0}",
    description: "Set the max force value",
    params: [
      {
        id: "speed",
        name: "Max force",
        desc: "The max force value",
        type: "number",
        initialValue: "",
      },
    ],
  },
  function (maxForce) {
    this.maxForce = maxForce;
  },
  false
);

action(
  category,
  "SetAngle",
  {
    id: "setangle",
    highlight: false,
    deprecated: false,
    listName: "Set angle",
    displayText: "{my}: Set angle behavior: {0}",
    description: "Set the angle",
    params: [
      {
        id: "set-angle",
        name: "Set Angle",
        desc: "The angle behavior",
        type: "boolean",
        initialValue: "true",
      },
    ],
  },
  function (angle) {
    this.setAngle = angle;
  },
  false
);
