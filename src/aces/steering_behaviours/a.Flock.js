export const config = {
  id: "flock1",
  c2id: 1,
  highlight: true,
  deprecated: false,
  isAsync: false,
  listName: "Flock",
  displayText:
    "{my}: Flock with {2} to the position ([i]{0}[/i],[i]{1}[/i]) with params [i]({3}, {4}, {5}, {6}, {7}, {8})[/i]",
  description: "Flock behavior",
  params: [
    {
      id: "target_x0",
      type: "number",
      name: "Target X",
      desc: "The target x value",
      initialValue: "",
    },
    {
      id: "target_y1",
      type: "number",
      name: "Target Y",
      desc: "The target y value",
      initialValue: "",
    },
    {
      id: "flock_with2",
      type: "object",
      name: "Flock with",
      desc: "The object type to flock with",
      allowedPluginIds: ["<world>"],
    },
    {
      id: "target_priority3",
      type: "number",
      name: "Target priority",
      desc: "The target priority value",
      initialValue: "",
    },
    {
      id: "seperation_priority4",
      type: "number",
      name: "Seperation priority",
      desc: "The seperation priority value",
      initialValue: "",
    },
    {
      id: "alignment_priority5",
      type: "number",
      name: "Alignment priority",
      desc: "The alignment priority value",
      initialValue: "",
    },
    {
      id: "cohesion_priority6",
      type: "number",
      name: "Cohesion priority",
      desc: "The cohesion priority value",
      initialValue: "",
    },
    {
      id: "seperation_distance7",
      type: "number",
      name: "Seperation distance",
      desc: "The seperation distance value",
      initialValue: "",
    },
    {
      id: "max_flockmates8",
      type: "number",
      name: "Max flockmates",
      desc: "The max flockmates value",
      initialValue: "5",
    },
  ],
};

export const expose = true;

export default function (
  targetX,
  targetY,
  flockTargetType,
  targetPriority,
  separationPriority,
  alignmentPriority,
  cohesionPriority,
  separationDistance,
  maxFlockmates
) {
  var deltax = targetX - this.instance.x;
  var deltay = targetY - this.instance.y;

  // Normalize
  var length = Math.sqrt(deltax * deltax + deltay * deltay);
  var normalx = length > 0 ? deltax / length : 0;
  var normaly = length > 0 ? deltay / length : 0;

  // Move toward target
  var desiredVelocityX = normalx * this.maxSpeed * targetPriority;
  var desiredVelocityY = normaly * this.maxSpeed * targetPriority;

  // Get all flockmates
  var flockers = flockTargetType.getAllInstances();

  // NEW: Sort by distance to prioritize nearest agents
  flockers.sort((a, b) => {
    let dx1 = this.instance.x - a.x;
    let dy1 = this.instance.y - a.y;
    let dist1 = dx1 * dx1 + dy1 * dy1; // Squared distance (faster)

    let dx2 = this.instance.x - b.x;
    let dy2 = this.instance.y - b.y;
    let dist2 = dx2 * dx2 + dy2 * dy2;

    return dist1 - dist2;
  });

  var count = Math.min(flockers.length, maxFlockmates); // Only consider closest agents

  for (var i = 0; i < count; i++) {
    var a = flockers[i];
    if (a === this.instance) continue; // Skip itself

    var dx = this.instance.x - a.x;
    var dy = this.instance.y - a.y;
    var distanceSquared = dx * dx + dy * dy; // Squared distance (avoid sqrt for speed)

    if (distanceSquared > separationDistance * separationDistance * 4) continue; // Ignore distant agents

    var distance = Math.sqrt(distanceSquared);
    var normalx = distance > 0 ? dx / distance : 0;
    var normaly = distance > 0 ? dy / distance : 0;

    // SEPARATION (Repulsion)
    if (distance < separationDistance) {
      var separationX =
        (normalx / (distance / separationDistance)) * separationPriority;
      var separationY =
        (normaly / (distance / separationDistance)) * separationPriority;
      desiredVelocityX += separationX;
      desiredVelocityY += separationY;
    }

    // COHESION (Attraction)
    var cohesionX = (-normalx * cohesionPriority) / count;
    var cohesionY = (-normaly * cohesionPriority) / count;
    desiredVelocityX += cohesionX;
    desiredVelocityY += cohesionY;

    // ALIGNMENT (Heading matching)
    let aBehavior = Object.values(a.behaviors).find(
      (behavior) => behavior instanceof behavior._isFlockingBehavior
    );
    let angle = aBehavior ? aBehavior.getAngle() : a.angle;
    var alignmentX =
      (Math.cos(C3.toRadians(angle)) * alignmentPriority) / count;
    var alignmentY =
      (Math.sin(C3.toRadians(angle)) * alignmentPriority) / count;
    desiredVelocityX += alignmentX;
    desiredVelocityY += alignmentY;
  }

  // Calculate steering force
  var sx = desiredVelocityX - this.dx;
  var sy = desiredVelocityY - this.dy;

  // Limit force
  var force = Math.sqrt(sx * sx + sy * sy);
  var scaleFactor = force > this.maxForce ? this.maxForce / force : 1;

  this.sx = sx * scaleFactor;
  this.sy = sy * scaleFactor;
}
