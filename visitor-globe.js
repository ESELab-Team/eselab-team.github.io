const SITE_ID = '8ace6608-efb5-4036-bcda-f48375b8127f';
const DATA_URL = `https://feed-pulse.com/api/visitor-map/${SITE_ID}?hours=87600&limit=400`;
const TEXTURE_URL = 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg';

const container = document.getElementById('visitor-globe-map');
const canvas = document.getElementById('visitor-globe-canvas');
const totalLabel = document.querySelector('[data-visitor-total]');
const loadingLabel = container?.querySelector('.visitor-map-loading');

if (container && canvas && totalLabel) {
  const context = canvas.getContext('2d', { alpha: true });
  const textureCanvas = document.createElement('canvas');
  const textureContext = textureCanvas.getContext('2d', { willReadFrequently: true });
  const globeCanvas = document.createElement('canvas');
  const globeContext = globeCanvas.getContext('2d');
  const texture = new Image();

  const DEG = Math.PI / 180;
  let texturePixels = null;
  let visitorCount = null;
  let visitorPoints = [];
  let width = 0;
  let height = 0;
  let longitude = 105 * DEG;
  let latitude = 24 * DEG;
  let lastFrame = performance.now();
  let dragging = false;
  let pointerX = 0;
  let pointerY = 0;
  let interactionTime = 0;

  const places = [
    { en: 'China', zh: '中国', lat: 35.8, lon: 103.8 },
    { en: 'Beijing', zh: '北京', lat: 39.9, lon: 116.4, city: true },
    { en: 'Shanghai', zh: '上海', lat: 31.2, lon: 121.5, city: true },
    { en: 'Singapore', zh: '新加坡', lat: 1.35, lon: 103.82, city: true },
    { en: 'Japan', zh: '日本', lat: 37.2, lon: 138.1 },
    { en: 'South Korea', zh: '韩国', lat: 36.4, lon: 127.8 },
    { en: 'Russia', zh: '俄罗斯', lat: 54.5, lon: 106.5 },
    { en: 'India', zh: '印度', lat: 22.6, lon: 79.0 },
    { en: 'Vietnam', zh: '越南', lat: 16.1, lon: 107.8 },
    { en: 'Thailand', zh: '泰国', lat: 15.4, lon: 101.0 },
    { en: 'Philippines', zh: '菲律宾', lat: 12.7, lon: 122.5 },
    { en: 'Indonesia', zh: '印度尼西亚', lat: -2.3, lon: 118.0 },
    { en: 'Australia', zh: '澳大利亚', lat: -25.5, lon: 134.0 }
  ];

  const isChinese = () => document.documentElement.lang.toLowerCase().startsWith('zh');

  const updateCounterCopy = () => {
    const value = visitorCount === null
      ? '—'
      : visitorCount.toLocaleString(isChinese() ? 'zh-CN' : 'en-US');
    totalLabel.textContent = isChinese() ? `累计访客：${value}` : `TOTAL VISITORS: ${value}`;
  };

  const wrapLongitude = (value) => {
    let wrapped = value;
    while (wrapped > Math.PI) wrapped -= Math.PI * 2;
    while (wrapped < -Math.PI) wrapped += Math.PI * 2;
    return wrapped;
  };

  const resize = () => {
    const bounds = container.getBoundingClientRect();
    width = Math.max(1, Math.round(bounds.width));
    height = Math.max(1, Math.round(bounds.height));
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    draw();
  };

  const geometry = () => ({
    radius: Math.floor(Math.min(width * 0.46, height * 0.39)),
    centerX: width * 0.5,
    centerY: height * 0.58
  });

  const project = (latDegrees, lonDegrees, sphere = geometry()) => {
    const lat = latDegrees * DEG;
    const lon = lonDegrees * DEG;
    const deltaLon = wrapLongitude(lon - longitude);
    const cosLat = Math.cos(lat);
    const sinLat = Math.sin(lat);
    const cosViewLat = Math.cos(latitude);
    const sinViewLat = Math.sin(latitude);
    const depth = sinLat * sinViewLat + cosLat * cosViewLat * Math.cos(deltaLon);

    if (depth <= 0.06) return null;

    return {
      x: sphere.centerX + sphere.radius * cosLat * Math.sin(deltaLon),
      y: sphere.centerY - sphere.radius * (sinLat * cosViewLat - cosLat * Math.cos(deltaLon) * sinViewLat),
      depth
    };
  };

  const drawBackground = () => {
    context.clearRect(0, 0, width, height);
    const gradient = context.createRadialGradient(width * 0.46, height * 0.46, 8, width * 0.5, height * 0.52, Math.max(width, height) * 0.66);
    gradient.addColorStop(0, '#879DBC');
    gradient.addColorStop(0.56, '#526A8F');
    gradient.addColorStop(1, '#1D2B48');
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'rgba(255,255,255,.34)';
    for (let i = 0; i < 34; i += 1) {
      const x = (i * 73 + 29) % Math.max(width, 1);
      const y = (i * 47 + 61) % Math.max(height, 1);
      const size = i % 9 === 0 ? 1.2 : 0.65;
      context.fillRect(x, y, size, size);
    }
  };

  const renderGlobeTexture = (sphere) => {
    if (!texturePixels || sphere.radius < 4) return;

    const diameter = sphere.radius * 2;
    if (globeCanvas.width !== diameter || globeCanvas.height !== diameter) {
      globeCanvas.width = diameter;
      globeCanvas.height = diameter;
    }

    const image = globeContext.createImageData(diameter, diameter);
    const target = image.data;
    const source = texturePixels.data;
    const sourceWidth = texturePixels.width;
    const sourceHeight = texturePixels.height;
    const cosViewLat = Math.cos(latitude);
    const sinViewLat = Math.sin(latitude);

    for (let py = 0; py < diameter; py += 1) {
      const normalizedY = (sphere.radius - py - 0.5) / sphere.radius;
      for (let px = 0; px < diameter; px += 1) {
        const normalizedX = (px + 0.5 - sphere.radius) / sphere.radius;
        const distanceSquared = normalizedX * normalizedX + normalizedY * normalizedY;
        if (distanceSquared > 1) continue;

        const surfaceZ = Math.sqrt(1 - distanceSquared);
        const lat = Math.asin(normalizedY * cosViewLat + surfaceZ * sinViewLat);
        const lon = wrapLongitude(longitude + Math.atan2(
          normalizedX,
          surfaceZ * cosViewLat - normalizedY * sinViewLat
        ));
        const sourceX = Math.min(sourceWidth - 1, Math.max(0, Math.floor((lon + Math.PI) / (Math.PI * 2) * sourceWidth)));
        const sourceY = Math.min(sourceHeight - 1, Math.max(0, Math.floor((Math.PI / 2 - lat) / Math.PI * sourceHeight)));
        const sourceIndex = (sourceY * sourceWidth + sourceX) * 4;
        const targetIndex = (py * diameter + px) * 4;

        const light = Math.max(0.16, normalizedX * -0.3 + normalizedY * 0.34 + surfaceZ * 0.86);
        const limb = 0.56 + 0.44 * Math.pow(surfaceZ, 0.42);
        const shade = Math.min(1.08, (0.42 + light * 0.7) * limb);
        target[targetIndex] = source[sourceIndex] * shade;
        target[targetIndex + 1] = source[sourceIndex + 1] * shade;
        target[targetIndex + 2] = source[sourceIndex + 2] * shade;
        target[targetIndex + 3] = 255;
      }
    }

    globeContext.putImageData(image, 0, 0);

    context.save();
    context.shadowColor = 'rgba(226, 240, 255, .95)';
    context.shadowBlur = 18;
    context.beginPath();
    context.arc(sphere.centerX, sphere.centerY, sphere.radius + 1, 0, Math.PI * 2);
    context.fillStyle = 'rgba(190, 220, 255, .35)';
    context.fill();
    context.restore();

    context.drawImage(globeCanvas, sphere.centerX - sphere.radius, sphere.centerY - sphere.radius);
    context.beginPath();
    context.arc(sphere.centerX, sphere.centerY, sphere.radius, 0, Math.PI * 2);
    context.strokeStyle = 'rgba(235, 247, 255, .75)';
    context.lineWidth = 1;
    context.stroke();
  };

  const drawLabels = (sphere) => {
    const labels = places
      .map((place) => ({ place, point: project(place.lat, place.lon, sphere) }))
      .filter(({ point }) => point && point.depth > 0.2)
      .sort((a, b) => a.point.depth - b.point.depth);

    context.textAlign = 'center';
    context.textBaseline = 'middle';

    labels.forEach(({ place, point }) => {
      const fontSize = place.city ? 7 : 8;
      const label = isChinese() ? place.zh : place.en;
      context.font = `${place.city ? 500 : 600} ${fontSize}px Arial, sans-serif`;
      context.lineWidth = 2.2;
      context.strokeStyle = 'rgba(15, 20, 25, .88)';
      context.strokeText(label, point.x, point.y);
      context.fillStyle = 'rgba(255, 255, 255, .94)';
      context.fillText(label, point.x, point.y);

      if (place.city) {
        context.beginPath();
        context.arc(point.x - context.measureText(label).width / 2 - 3, point.y, 1.1, 0, Math.PI * 2);
        context.fillStyle = '#FFFFFF';
        context.fill();
      }
    });
  };

  const clusterProjectedPoints = (sphere) => {
    const clusters = [];
    visitorPoints.forEach((visitor) => {
      const point = project(visitor.lat, visitor.lon, sphere);
      if (!point) return;
      const weight = Math.max(1, Number(visitor.count) || 1);
      const existing = clusters.find((cluster) => Math.hypot(cluster.x - point.x, cluster.y - point.y) < 18);
      if (existing) {
        const combined = existing.count + weight;
        existing.x = (existing.x * existing.count + point.x * weight) / combined;
        existing.y = (existing.y * existing.count + point.y * weight) / combined;
        existing.count = combined;
      } else {
        clusters.push({ x: point.x, y: point.y, count: weight, depth: point.depth });
      }
    });
    return clusters;
  };

  const drawVisitors = (sphere) => {
    const clusters = clusterProjectedPoints(sphere).sort((a, b) => a.depth - b.depth);
    clusters.forEach((cluster) => {
      const radius = cluster.count > 1 ? Math.min(12, 6 + Math.log10(cluster.count) * 2.4) : 5;
      context.beginPath();
      context.arc(cluster.x, cluster.y, radius + 5, 0, Math.PI * 2);
      context.fillStyle = 'rgba(242, 69, 38, .18)';
      context.fill();

      context.beginPath();
      context.arc(cluster.x, cluster.y, radius, 0, Math.PI * 2);
      context.fillStyle = '#F04A2E';
      context.fill();
      context.strokeStyle = '#FFFFFF';
      context.lineWidth = 1.2;
      context.stroke();

      if (cluster.count > 1) {
        context.fillStyle = '#FFFFFF';
        context.font = '700 8px Arial, sans-serif';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(String(cluster.count), cluster.x, cluster.y + 0.5);
      }
    });
  };

  function draw() {
    if (!context || width < 2 || height < 2) return;
    drawBackground();
    const sphere = geometry();
    renderGlobeTexture(sphere);
    if (texturePixels) {
      drawLabels(sphere);
      drawVisitors(sphere);
    }
  }

  const normalizePoint = (point) => {
    const lat = Number(point.lat ?? point.latitude);
    const lon = Number(point.lng ?? point.lon ?? point.longitude);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
    return { lat, lon, count: Number(point.count) || 1 };
  };

  const refreshVisitors = async () => {
    try {
      const response = await fetch(DATA_URL, { mode: 'cors' });
      if (!response.ok) throw new Error('Visitor data unavailable');
      const data = await response.json();
      visitorCount = Number(data.count) || 0;
      visitorPoints = (Array.isArray(data.points) ? data.points : []).map(normalizePoint).filter(Boolean);
      updateCounterCopy();
      draw();
    } catch (error) {
      visitorCount = null;
      visitorPoints = [];
      updateCounterCopy();
      draw();
    }
  };

  const loadTexture = () => {
    texture.crossOrigin = 'anonymous';
    texture.decoding = 'async';
    texture.onload = () => {
      textureCanvas.width = 720;
      textureCanvas.height = 360;
      textureContext.drawImage(texture, 0, 0, textureCanvas.width, textureCanvas.height);
      texturePixels = textureContext.getImageData(0, 0, textureCanvas.width, textureCanvas.height);
      loadingLabel?.remove();
      draw();
    };
    texture.onerror = () => {
      if (loadingLabel) loadingLabel.textContent = isChinese() ? '地球影像暂时无法加载' : 'Globe imagery unavailable';
    };
    texture.src = TEXTURE_URL;
  };

  canvas.addEventListener('pointerdown', (event) => {
    dragging = true;
    pointerX = event.clientX;
    pointerY = event.clientY;
    interactionTime = performance.now();
    canvas.setPointerCapture(event.pointerId);
  });

  canvas.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    const deltaX = event.clientX - pointerX;
    const deltaY = event.clientY - pointerY;
    pointerX = event.clientX;
    pointerY = event.clientY;
    longitude = wrapLongitude(longitude - deltaX * 0.008);
    latitude = Math.max(-60 * DEG, Math.min(60 * DEG, latitude + deltaY * 0.005));
    interactionTime = performance.now();
    draw();
  });

  const stopDragging = (event) => {
    dragging = false;
    interactionTime = performance.now();
    if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
  };

  canvas.addEventListener('pointerup', stopDragging);
  canvas.addEventListener('pointercancel', stopDragging);

  const animate = (time) => {
    const elapsed = Math.min(100, time - lastFrame);
    lastFrame = time;
    if (!dragging && time - interactionTime > 2400 && document.visibilityState === 'visible') {
      longitude = wrapLongitude(longitude + elapsed * 0.000002);
      draw();
    }
    window.setTimeout(() => requestAnimationFrame(animate), 90);
  };

  updateCounterCopy();
  new MutationObserver(() => {
    updateCounterCopy();
    draw();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  new ResizeObserver(resize).observe(container);
  loadTexture();
  refreshVisitors();
  window.setInterval(refreshVisitors, 60000);
  requestAnimationFrame(animate);
}
