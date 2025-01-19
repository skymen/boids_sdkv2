import { id } from "../../config.caw.js";

export default function (parentClass) {
  return class extends parentClass {
    constructor() {
      super();
      const properties = this._getInitProperties();
      this.dx = 0;
      this.dy = 0;
      this._isFlockingBehavior = true;
      // Limits
      this.maxForce = 0.1;
      this.maxSpeed = 5;
      this.setAngle = true;
      // Steering force
      this.sx = 0;
      this.sy = 0;

      this.enabled = true;
      if (properties) {
        this.maxSpeed = properties[0];
        this.maxForce = properties[1];
        this.setAngle = properties[2];
      }

      // Opt-in to getting calls to Tick()
      this._setTicking(true);
    }

    _trigger(method) {
      super._trigger(self.C3.Plugins[id].Cnds[method]);
    }

    _release() {
      super._release();
    }

    _saveToJson() {
      let keys = ["sx", "sy", "maxForce", "dx", "dy", "setAngle", "maxSpeed"];
      let o = {};
      keys.forEach((key) => {
        o[key] = this[key];
      });
      return {
        ...o,
      };
    }

    _loadFromJson(o) {
      let keys = ["sx", "sy", "maxForce", "dx", "dy", "setAngle", "maxSpeed"];
      keys.forEach((key) => {
        this[key] = o[key];
      });
    }

    _getDebuggerProperties() {
      return [
        {
          title: "Boids",
          properties: [
            {
              name: "$Max Force",
              value: this.maxForce,
              onedit: (val) => {
                this.maxForce = parseFloat(val);
              },
            },
            {
              name: "$Max Speed",
              value: this.maxSpeed,
              onedit: (val) => {
                this.maxSpeed = parseFloat(val);
              },
            },
            {
              name: "$Set Angle",
              value: this.setAngle,
              onedit: (val) => {
                this.setAngle = !!val;
              },
            },
            { name: "$dx", value: this.dx },
            { name: "$dy", value: this.dy },
            { name: "$sx", value: this.sx },
            { name: "$sy", value: this.sy },
          ],
        },
      ];
    }

    _tick() {
      const dt = this.instance.dt;
      const wi = this.instance;
      // Calculate magnitude of steering force
      var force = Math.sqrt(this.sx * this.sx + this.sy * this.sy);

      // Truncate if greater than maxForce
      var scaleFactor = force > this.maxForce ? this.maxForce / force : 1;
      this.sx = this.sx * scaleFactor * dt;
      this.sy = this.sy * scaleFactor * dt;

      // Accelerate
      this.dx += this.sx;
      this.dy += this.sy;

      // Calculate magnitude of current speed
      var speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy);

      // Truncate speed if over max speed
      if (speed > this.maxSpeed) {
        var scaleFactor = this.maxSpeed / speed;
        this.dx = this.dx * scaleFactor;
        this.dy = this.dy * scaleFactor;
      }
      var mx = this.dx * dt;
      var my = this.dy * dt;

      // Update position
      wi.offsetPosition(mx, my);

      // Update angle
      if (this.setAngle) wi.angle = this.getAngle();

      // Reset the steering force for the next tick
      this.sx = 0;
      this.sy = 0;
    }

    getSpeed() {
      return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    }

    getAngle() {
      return Math.atan2(this.dy, this.dx);
    }
  };
}
