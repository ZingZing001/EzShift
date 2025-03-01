document.addEventListener("DOMContentLoaded", function () {
  let currentHour = 0;
  let hoursWorked = 40;
  let totalHours = 60;
  // Get the toggle button and add a click event listener
  const toggleButton = document.getElementById("toggle-week");
  if (toggleButton) {
    toggleButton.addEventListener("click", function () {
      if (toggleButton.textContent.trim() === "this week") {
        toggleButton.textContent = "in total";
      } else {
        toggleButton.textContent = "this week";
      }
    });
  } else {
    console.warn("Toggle button not found.");
  }

  // Get the canvas element and its 2D context
  const canvas = document.getElementById("hoursChart");
  if (!canvas) {
    console.error("Canvas element with id 'hoursChart' not found.");
    return;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Canvas context not available.");
    return;
  }

  // Basic settings and parameters
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const outerRadius = 80;
  const lineWidth = 17;
  const startAngle = -0.5 * Math.PI;
  const dummyPercentage = 0.1; // 65% hours worked

  // Define a very small gap between arcs (in radians)
  const gapPercentage = 0.02; // Very small gap (2% of the total angle)
  const totalAvailableAngle = 2 * Math.PI - gapPercentage * 2 * Math.PI;
  const greenAngle = dummyPercentage * totalAvailableAngle;
  const greyAngle = (1 - dummyPercentage) * totalAvailableAngle;
  const greenEndAngle = startAngle + greenAngle;
  const greyStartAngle = greenEndAngle + gapPercentage * 2 * Math.PI;
  const greyEndAngle = greyStartAngle + greyAngle;

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw background circle with a radial gradient to simulate inner shadow
  try {
    const bgGradient = ctx.createRadialGradient(
      centerX,
      centerY,
      outerRadius - lineWidth,
      centerX,
      centerY,
      outerRadius
    );
    bgGradient.addColorStop(0, "#fff");
    bgGradient.addColorStop(1, "#e0e0e0");
    ctx.fillStyle = bgGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI, false);
    ctx.fill();
  } catch (e) {
    console.error("Error drawing background circle:", e);
  }

  // Save context state to apply shadow settings for the arcs
  ctx.save();
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round"; // Changed to "round" for rounder caps
  ctx.miterLimit = 1; // Added miterLimit for smoother joints

  // Add outer shadow for a 3D effect
  ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
  ctx.shadowBlur = 3;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;

  // Draw the green arc (hours worked) with a gradient stroke
  let gradient;
  if (typeof ctx.createConicGradient === "function") {
    try {
      gradient = ctx.createConicGradient(startAngle, centerX, centerY);
      gradient.addColorStop(0, "lightgreen");
      gradient.addColorStop(dummyPercentage, "green");
    } catch (e) {
      console.error("Error using conic gradient:", e);
      gradient = ctx.createLinearGradient(centerX - outerRadius, centerY, centerX + outerRadius, centerY);
      gradient.addColorStop(0, "lightgreen");
      gradient.addColorStop(1, "green");
    }
  } else {
    gradient = ctx.createLinearGradient(centerX - outerRadius, centerY, centerX + outerRadius, centerY);
    gradient.addColorStop(0, "lightgreen");
    gradient.addColorStop(1, "green");
  }
  ctx.strokeStyle = gradient;
  ctx.beginPath();
  ctx.arc(centerX, centerY, outerRadius, startAngle + totalAvailableAngle * 0.018, greenEndAngle - totalAvailableAngle * 0.01, false);
  ctx.stroke();

  ctx.lineWidth = lineWidth - 10;
  // Draw the grey arc (hours left)
  ctx.strokeStyle = "#ccc";
  ctx.beginPath();
  ctx.arc(centerX, centerY, outerRadius, greyStartAngle + totalAvailableAngle * 0.015, greyEndAngle - totalAvailableAngle * 0.025, false);
  ctx.stroke();

  // Restore context state to remove shadow settings
  ctx.restore();

  // Draw percentage text in the center without any shadow
  ctx.font = "20px Arial";
  ctx.fillStyle = "#333";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(Math.round(dummyPercentage * 100) + "%", centerX, centerY);

  console.log("Circular progress indicator rendered successfully.");
});