// K线仪表盘 + 动态背景
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let width, height, mouseX, mouseY, offset = 0, speed = 0.5;
let currentIdx = 'CSI500', ripples = [];

const config = {
    'CSI500': { base: 6200, vol: 35 },
    'NASDAQ': { base: 16500, vol: 80 }
};

let data = [];

function gen() {
    data = [];
    let cur = config[currentIdx].base;
    for(let i = 0; i < 800; i++) {
        let o = cur;
        let move = (Math.random() - 0.5) * config[currentIdx].vol;
        let c = o + move;
        let h = Math.max(o, c) + Math.random() * (config[currentIdx].vol / 2);
        let l = Math.min(o, c) - Math.random() * (config[currentIdx].vol / 2);
        data.push({o, c, h, l});
        cur = c;
    }
}

function setIdx(m) {
    currentIdx = m;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    if(event) event.target.classList.add('active');
    gen();
}

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

function draw() {
    ctx.fillStyle = '#050508';
    ctx.fillRect(0, 0, width, height);
    
    // 网格
    ctx.strokeStyle = '#111';
    for(let x = offset % 40; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }

    const w = 10, g = 6, totalW = w + g;
    offset -= speed;

    let visibleHigh = -Infinity, visibleLow = Infinity, visibleCandles = [];

    data.forEach((d, i) => {
        let x = i * totalW + (offset % (data.length * totalW));
        if(x < -totalW) x += data.length * totalW;
        if(x >= -totalW && x <= width + totalW) {
            if(d.h > visibleHigh) visibleHigh = d.h;
            if(d.l < visibleLow) visibleLow = d.l;
            visibleCandles.push({d, x});
        }
    });

    const padding = height * 0.2;
    const drawHeight = height - padding * 2;
    const priceRange = (visibleHigh - visibleLow) || 1;
    const yScale = drawHeight / priceRange;

    const getY = (price) => height - padding - (price - visibleLow) * yScale;

    visibleCandles.forEach(({d, x}) => {
        const isUp = d.c > d.o;
        ctx.strokeStyle = isUp ? '#f6465d' : '#0ecb81';
        ctx.fillStyle = ctx.strokeStyle;

        ctx.beginPath();
        ctx.moveTo(x + w/2, getY(d.h));
        ctx.lineTo(x + w/2, getY(d.l));
        ctx.stroke();

        const yO = getY(d.o);
        const yC = getY(d.c);
        ctx.fillRect(x, Math.min(yO, yC), w, Math.abs(yO - yC) + 1);

        if(Math.abs(mouseX - x) < totalW/2) {
            document.getElementById('p-val').innerText = d.c.toFixed(2);
            document.getElementById('p-val').style.color = isUp ? '#f6465d' : '#0ecb81';
            let diff = (d.c - d.o).toFixed(2);
            document.getElementById('p-chg').innerText = (diff > 0 ? '+' : '') + diff;
        }
    });

    ripples.forEach((r, i) => {
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.s, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,242,255,${r.o})`;
        ctx.stroke();
        r.s += 3;
        r.o -= 0.03;
        if(r.o <= 0) ripples.splice(i, 1);
    });

    requestAnimationFrame(draw);
}

window.onmousemove = e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
};

window.onmousedown = e => {
    speed = 4;
    ripples.push({x: e.clientX, y: e.clientY, s: 0, o: 1});
};

window.onmouseup = () => { speed = 0.5; };
window.onresize = resize;

gen();
resize();
draw();
