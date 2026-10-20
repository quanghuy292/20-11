/**
 * ===================================================================
 * DỰ ÁN WEBSITE HỘP QUÀ TÌNH YÊU 20/11 💗
 * Script chính (Bản nâng cấp Vũ Trụ Đen, Mưa Tim Neon & Mưa Ảnh Rơi Lặp Lại):
 * - Passcode bí mật & bàn phím số
 * - Hộp quà 3D chuyển động vật lý chân thực
 * - Hiệu ứng hoa, tim, confetti và bóng bay bay trực tiếp từ miệng hộp quà
 * - Thư tình hiệu ứng đánh máy tốc độ cao, mượt mà không giựt lag
 * - KHUNG CẢNH VŨ TRỤ ĐEN:
 *   + Mưa trái tim phát sáng neon (💖, 💗, 💕, ❤️) tự động rơi liên tục từ trời xuống
 *   + CÁC BỨC ẢNH NGƯỜI YÊU RƠI XUỐNG CÙNG VÀ LẶP ĐI LẶP LẠI KHÔNG NGỪNG
 *   + Nút "Mưa Tim Bão Hòa 💖" tạo cơn mưa tim dày đặc rực rỡ
 *   + Tự do tải thêm ảnh từ máy hoặc cấu hình đường dẫn ảnh
 *   + Khắc phục triệt để hiện tượng giật lag bằng GPU Sprite Caching & translate3d
 * - Bộ phát nhạc lofi piano du dương qua Web Audio API
 * ===================================================================
 */

'use strict';

// ==================== 1. KHU VỰC CẤU HÌNH DỄ DÀNG CHỈNH SỬA ====================
const CONFIG = {
  // Mật mã mở quà (bạn có thể thay đổi tùy thích, mặc định 2208)
  passcode: "2210",

  // Tên hoặc biệt danh của bạn gái
  girlfriendName: "Cô gái đặc biệt nhất của anh",

  // Tên hoặc biệt danh của bạn trai (người gửi)
  senderName: "Anh người yêu của em",

  // Dòng huy hiệu đầu trang
  headerBadge: "Dành tặng cô gái anh thương nhất, nhân ngày 20/11 🌷",

  // Tiêu đề bức thư
  letterTitle: "💌 GỬI CÔ GÁI ANH THƯƠNG 💌",

  // Dòng phụ đề thư
  letterSubtitle: "Có những điều anh muốn nói với em bằng cả trái tim...",

  // Câu trích dẫn viết tay phía cuối thư
  handwritingQuote: "You are my favorite person 💗",

  // Tốc độ đánh máy (mili-giây, ~25ms giúp chữ chạy đều đặn, mượt mà)
  typingSpeed: 25,

  // Link file nhạc nền mp3 (nếu để trống "", tự động phát giai điệu piano hộp nhạc bằng Web Audio API)
  bgMusicUrl: "music/anhyeuem.mp3",

  // ==================== ALBUM ẢNH NGƯỜI YÊU TRONG VŨ TRỤ ====================
  // HƯỚNG DẪN: Bạn có thể điền link ảnh trực tiếp vào url (ví dụ: "anh1.jpg", "images/em.png", "https://...")
  // HOẶC bạn có thể bấm nút "Thêm ảnh của em 📷" ngay trên web để chọn ảnh trực tiếp từ máy tính/điện thoại!
  // Các bức ảnh này sẽ TỰ ĐỘNG RƠI XUỐNG CÙNG MƯA TIM VÀ LẶP ĐI LẶP LẠI!
  photos: [
    {
      url: "img/1.jpg", // Để trống "" nếu chưa có, hoặc dán link ảnh: "images/anh1.jpg"
      caption: "Nụ cười làm tan chảy trái tim anh ✨",
      tag: "KHOẢNH KHẮC NGỌT NGÀO"
    },
    {
      url: "img/2.jpg",
      caption: "Cô gái xinh đẹp và rạng rỡ nhất 🌸",
      tag: "VẺ ĐẸP CỦA EM"
    },
    {
      url: "img/3.jpg",
      caption: "Mỗi giây phút bên em đều là bình yên 💖",
      tag: "BÌNH YÊN BÊN EM"
    },
    {
      url: "img/4.jpg",
      caption: "Em là điều kỳ diệu nhất trong vũ trụ này 🌷",
      tag: "ĐIỀU KỲ DIỆU"
    },
    {
      url: "img/5.jpg",
      caption: "Mãi yêu em, công chúa nhỏ của anh 👑",
      tag: "YÊU THƯƠNG ĐONG ĐẦY"
    },
    {
      url: "img/6.jpg",
      caption: "Cùng nhau đi qua muôn vàn mùa 20/11 nhé 💫",
      tag: "BÊN NHAU MÃI MÃI"
    }
  ],

  // Nội dung bức thư tình 20/11 đầy đủ và sâu sắc
  letterContent: `Gửi em, cô gái đặc biệt nhất của anh! 💗

Hôm nay là ngày 20/11, một ngày thật đặc biệt. Anh cũng muốn dành riêng cho em một món quà nhỏ, bởi em là cô gái mà anh luôn muốn nhìn thấy nụ cười mỗi ngày.

Anh không biết món quà này có đủ đặc biệt hay không, nhưng anh đã muốn tạo ra nó để em có thể cảm nhận được một chút yêu thương mà anh muốn dành cho em. Từng bông hoa, từng trái tim và từng dòng chữ đều là cách anh gửi đến em một lời nhắn nhỏ: em rất quan trọng đối với anh. 🌷

Cảm ơn em vì đã xuất hiện trong cuộc sống của anh. Cảm ơn em vì những lúc vui vẻ, những cuộc trò chuyện đáng nhớ và cả những khoảnh khắc bình dị khiến anh cảm thấy ngày hôm đó trở nên tốt đẹp hơn.

Anh mong em luôn vui vẻ, luôn khỏe mạnh, luôn tự tin vào bản thân và có đủ dũng khí để theo đuổi những điều em yêu thích. Nếu có những ngày em cảm thấy mệt mỏi, anh mong em nhớ rằng em không cần phải lúc nào cũng mạnh mẽ. Em cũng xứng đáng được quan tâm, được lắng nghe và được yêu thương thật dịu dàng.

Anh không hứa rằng mọi ngày sau này đều sẽ hoàn hảo, nhưng anh mong chúng ta có thể cùng nhau học cách thấu hiểu, chia sẻ và trân trọng nhau nhiều hơn. Anh muốn cùng em lưu giữ những kỷ niệm đẹp, từ những điều nhỏ bé nhất cho đến những khoảnh khắc thật đáng nhớ.

Nếu hôm nay em nhận được một bó hoa, hãy xem đó là lời nhắn rằng em xứng đáng với những điều đẹp đẽ. Nếu em nhìn thấy những trái tim đang bay lên, hãy nhớ rằng có một người đang rất vui vì được đồng hành cùng em. Và nếu em đọc đến những dòng cuối cùng này, anh chỉ muốn nói rằng...

“Cảm ơn em vì đã là em. Mong rằng chúng ta sẽ còn có thật nhiều ngày tháng đẹp đẽ bên nhau, cùng cười, cùng cố gắng và cùng tạo nên những kỷ niệm mà sau này nhớ lại vẫn thấy thật hạnh phúc.” 💖

Nhân ngày 20/11, anh chúc cô gái của anh luôn rạng rỡ, bình an, học tập và làm những điều mình yêu thích thật tốt. Mong rằng mỗi ngày của em đều có thật nhiều niềm vui, những điều tử tế và những người luôn trân trọng em.

Anh gửi đến em một bó hoa thật lớn, một cái ôm thật ấm áp và thật nhiều yêu thương. 🌹💐

Chúc cô gái anh thương có một ngày 20/11 thật vui vẻ và đáng nhớ!

Thương em nhiều lắm! ❤️`
};

// ==================== 2. QUẢN LÝ TRẠNG THÁI ỨNG DỤNG ====================
const state = {
  currentPasscode: "",
  isLocked: false,          // Khóa thao tác khi đang chạy hiệu ứng mở khóa
  hasGiftOpened: false,     // Đảm bảo chỉ mở hộp quà 1 lần
  isTyping: false,          // Trạng thái hiệu ứng gõ chữ
  typingTimeoutId: null,    // ID của timeout typewriter
  isMusicPlaying: false,    // Trạng thái phát nhạc
  audioContext: null,       // Web Audio Context
  musicIntervalId: null,    // Interval tạo nốt nhạc synth lofi
  scrollPending: false,     // Tránh forced reflow khi cuộn thư
  isUniverseActive: false   // Trạng thái màn hình vũ trụ
};

// ==================== 3. CÁC PHẦN TỬ DOM ====================
const DOM = {
  // Screens
  passcodeScreen: document.getElementById('passcode-screen'),
  giftScreen: document.getElementById('gift-screen'),
  letterScreen: document.getElementById('letter-screen'),
  universeScreen: document.getElementById('universe-screen'),

  // Passcode
  passcodeBadge: document.getElementById('passcode-badge'),
  passcodeDots: document.querySelectorAll('.passcode-dot'),
  dotsContainer: document.getElementById('passcode-dots'),
  passcodeFeedback: document.getElementById('passcode-feedback'),
  btnClear: document.getElementById('btn-clear'),
  btnBackspace: document.getElementById('btn-backspace'),
  btnUnlock: document.getElementById('btn-unlock'),
  keypadButtons: document.querySelectorAll('.keypad-btn'),

  // Gift Box 3D
  giftBoxInteractive: document.getElementById('gift-box-interactive'),
  btnOpenGift: document.getElementById('btn-open-gift'),
  giftLightBurst: document.getElementById('gift-light-burst'),

  // Letter
  letterTitle: document.getElementById('letter-title'),
  letterSubtitle: document.getElementById('letter-subtitle'),
  letterContent: document.getElementById('letter-content'),
  typingCursor: document.getElementById('typing-cursor'),
  letterQuote: document.getElementById('letter-quote'),
  senderDisplayName: document.getElementById('sender-display-name'),
  letterCard: document.getElementById('letter-card'),
  letterBodyContainer: document.getElementById('letter-body-container'),

  // Toolbar & Portal Button
  btnSendHeart: document.getElementById('btn-send-heart'),
  btnSendBouquet: document.getElementById('btn-send-bouquet'),
  btnReplayLetter: document.getElementById('btn-replay-letter'),
  btnEnterUniverse: document.getElementById('btn-enter-universe'),

  // Universe Screen & Falling Photos Stream
  universeCanvas: document.getElementById('universe-canvas'),
  fallingPhotosStream: document.getElementById('falling-photos-stream'),
  photosCountBadge: document.getElementById('photos-count-badge'),
  btnAddPhotos: document.getElementById('btn-add-photos'),
  photoFileInput: document.getElementById('photo-file-input'),
  btnUniverseRainHearts: document.getElementById('btn-universe-rain-hearts'),
  btnBackToLetter: document.getElementById('btn-back-to-letter'),

  // Lightbox
  photoLightbox: document.getElementById('photo-lightbox'),
  lightboxImg: document.getElementById('lightbox-img'),
  lightboxCaption: document.getElementById('lightbox-caption'),
  lightboxClose: document.getElementById('lightbox-close'),
  lightboxBackdrop: document.getElementById('lightbox-backdrop'),

  // Music & Global
  musicToggleBtn: document.getElementById('music-toggle-btn'),
  musicIcon: document.getElementById('music-icon'),
  musicText: document.getElementById('music-text'),
  musicWaves: document.getElementById('music-waves'),
  toast: document.getElementById('toast-message'),
  canvas: document.getElementById('ambient-canvas')
};

// ==================== 4. BỘ NHỚ ĐỆM EMOJI VÀ TRÁI TIM NEON CHO GPU (TRIỆT TIÊU LAG) ====================
const emojiSpriteCache = new Map();
const neonHeartCache = new Map();

// Sprite thường cho hoa và tim nền
function getEmojiSprite(emoji, size) {
  const roundedSize = Math.max(16, Math.round(size / 4) * 4);
  const cacheKey = `${emoji}_${roundedSize}`;

  if (emojiSpriteCache.has(cacheKey)) {
    return emojiSpriteCache.get(cacheKey);
  }

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const padding = 6;
  const canvasSize = (roundedSize + padding * 2);

  const offscreen = document.createElement('canvas');
  offscreen.width = canvasSize * dpr;
  offscreen.height = canvasSize * dpr;

  const ctx = offscreen.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.font = `${roundedSize}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(emoji, canvasSize / 2, canvasSize / 2);

  const spriteObj = {
    canvas: offscreen,
    width: canvasSize,
    height: canvasSize
  };

  emojiSpriteCache.set(cacheKey, spriteObj);
  return spriteObj;
}

// Sprite PHÁT SÁNG NEON RỰC RỠ CHO VŨ TRỤ (Nướng sẵn quầng sáng, 0% tốn CPU trong loop)
function getNeonHeartSprite(emoji, size) {
  const roundedSize = Math.max(16, Math.round(size / 4) * 4);
  const cacheKey = `${emoji}_${roundedSize}`;

  if (neonHeartCache.has(cacheKey)) {
    return neonHeartCache.get(cacheKey);
  }

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const glowPadding = Math.round(roundedSize * 0.8);
  const canvasSize = roundedSize + glowPadding * 2;

  const offscreen = document.createElement('canvas');
  offscreen.width = canvasSize * dpr;
  offscreen.height = canvasSize * dpr;

  const ctx = offscreen.getContext('2d');
  ctx.scale(dpr, dpr);

  const center = canvasSize / 2;

  // 1. Quầng sáng neon đa tầng mềm mại
  const radGrad = ctx.createRadialGradient(center, center, roundedSize * 0.15, center, center, canvasSize / 2);
  radGrad.addColorStop(0, 'rgba(255, 77, 109, 0.8)');
  radGrad.addColorStop(0.35, 'rgba(255, 0, 128, 0.45)');
  radGrad.addColorStop(0.7, 'rgba(255, 107, 154, 0.18)');
  radGrad.addColorStop(1, 'rgba(255, 107, 154, 0)');
  ctx.fillStyle = radGrad;
  ctx.beginPath();
  ctx.arc(center, center, canvasSize / 2, 0, Math.PI * 2);
  ctx.fill();

  // 2. Vẽ trái tim rực rỡ ở tâm
  ctx.font = `${roundedSize}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(emoji, center, center);

  const spriteObj = {
    canvas: offscreen,
    width: canvasSize,
    height: canvasSize,
    offset: canvasSize / 2
  };

  neonHeartCache.set(cacheKey, spriteObj);
  return spriteObj;
}

// ==================== 5. HỆ THỐNG CANVAS NỀN 1 (PASSCODE, HỘP QUÀ, THƯ) ====================
class ParticleEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.maxAmbientParticles = 35;
    this.isRunning = true;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.resize = this.resize.bind(this);
    this.loop = this.loop.bind(this);

    window.addEventListener('resize', this.resize, { passive: true });
    this.resize();
    this.initAmbientParticles();
    this.loop();

    document.addEventListener('visibilitychange', () => {
      this.isRunning = !document.hidden && !state.isUniverseActive;
      if (this.isRunning) this.loop();
    });
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  initAmbientParticles() {
    for (let i = 0; i < this.maxAmbientParticles; i++) {
      this.particles.push(this.createAmbientParticle(true));
    }
  }

  createAmbientParticle(initialRandomY = false) {
    const types = ['petal', 'heart', 'sparkle', 'bubble'];
    const type = types[Math.floor(Math.random() * types.length)];
    const startY = initialRandomY ? Math.random() * this.height : -30;

    return {
      type: type,
      x: Math.random() * this.width,
      y: startY,
      size: type === 'bubble' ? Math.random() * 16 + 10 : Math.random() * 12 + 10,
      speedX: (Math.random() - 0.5) * 1.1,
      speedY: type === 'bubble' ? -(Math.random() * 0.9 + 0.6) : (Math.random() * 1.1 + 0.6),
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.025,
      opacity: Math.random() * 0.55 + 0.35,
      color: this.getRandomPastelColor(),
      emoji: type === 'heart' ? ['💗', '💕', '💖', '❤️'][Math.floor(Math.random() * 4)] :
        type === 'petal' ? ['🌸', '🌹', '🌷'][Math.floor(Math.random() * 3)] : '✨',
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.03 + 0.01
    };
  }

  getRandomPastelColor() {
    const colors = [
      'rgba(255, 182, 193, 0.45)',
      'rgba(255, 218, 224, 0.5)',
      'rgba(205, 180, 219, 0.45)',
      'rgba(255, 209, 102, 0.4)',
      'rgba(189, 224, 254, 0.45)'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  burstConfetti(originX, originY, count = 75) {
    const colors = ['#FF4D6D', '#FF6B9A', '#CDB4DB', '#FFD166', '#FFF8E7', '#52B788', '#FF758F'];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI / 4) + (Math.random() * (Math.PI / 2));
      const speed = Math.random() * 9 + 4;
      const direction = Math.random() > 0.5 ? 1 : -1;
      this.particles.push({
        type: 'confetti',
        x: originX + (Math.random() - 0.5) * 30,
        y: originY,
        size: Math.random() * 8 + 6,
        speedX: Math.cos(angle) * speed * direction * 0.9,
        speedY: -Math.sin(angle) * speed * 1.2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.25,
        opacity: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        gravity: 0.16,
        decay: Math.random() * 0.007 + 0.005
      });
    }
  }

  burstFlowersAndHearts(originX, originY, count = 32) {
    const emojis = ['🌹', '🌷', '🌸', '💐', '🌺', '💖', '💗', '💕', '🫶'];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI / 5) + (Math.random() * (Math.PI * 3 / 5));
      const speed = Math.random() * 8 + 4;
      const direction = Math.random() > 0.5 ? 1 : -1;

      this.particles.push({
        type: 'burst-emoji',
        x: originX + (Math.random() - 0.5) * 40,
        y: originY,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        size: Math.random() * 12 + 20,
        speedX: Math.cos(angle) * speed * direction * 0.85,
        speedY: -Math.sin(angle) * speed * 1.15,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.08,
        opacity: 1,
        gravity: 0.07,
        decay: 0.0075
      });
    }
  }

  spawnBalloonsFromBox(originX, originY, count = 14) {
    const colors = [
      'rgba(255, 154, 162, 0.75)',
      'rgba(255, 183, 178, 0.75)',
      'rgba(255, 218, 193, 0.75)',
      'rgba(226, 240, 203, 0.75)',
      'rgba(181, 234, 215, 0.75)',
      'rgba(199, 206, 234, 0.75)'
    ];

    for (let i = 0; i < count; i++) {
      const spreadX = (Math.random() - 0.5) * 4;
      this.particles.push({
        type: 'balloon',
        x: originX + (Math.random() - 0.5) * 50,
        y: originY + (Math.random() - 0.5) * 20,
        size: Math.random() * 16 + 18,
        speedX: spreadX,
        speedY: -(Math.random() * 3.5 + 2.5),
        targetSpeedY: -(Math.random() * 1.2 + 0.8),
        color: colors[Math.floor(Math.random() * colors.length)],
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.035 + 0.015,
        opacity: 0.9
      });
    }
  }

  loop() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      if (p.type === 'confetti') {
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += p.gravity;
        p.rotation += p.rotationSpeed;
        p.opacity -= p.decay;

        if (p.opacity <= 0 || p.y > this.height) {
          this.particles.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rotation);
        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = Math.max(0, p.opacity);
        this.ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        this.ctx.restore();

      } else if (p.type === 'burst-emoji') {
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += p.gravity;
        p.rotation += p.rotationSpeed;
        p.opacity -= p.decay;

        if (p.opacity <= 0 || p.y > this.height + 60) {
          this.particles.splice(i, 1);
          continue;
        }

        const sprite = getEmojiSprite(p.emoji, p.size);
        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rotation);
        this.ctx.globalAlpha = Math.max(0, p.opacity);
        this.ctx.drawImage(sprite.canvas, -sprite.width / 2, -sprite.height / 2, sprite.width, sprite.height);
        this.ctx.restore();

      } else if (p.type === 'balloon') {
        p.wobble += p.wobbleSpeed;
        if (p.speedY < p.targetSpeedY) p.speedY += 0.05;
        p.speedX *= 0.985;
        p.x += Math.sin(p.wobble) * 0.7 + p.speedX;
        p.y += p.speedY;

        if (p.y < -90) {
          this.particles.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.globalAlpha = p.opacity;
        this.ctx.fillStyle = p.color;
        this.ctx.beginPath();
        this.ctx.ellipse(p.x, p.y, p.size * 0.85, p.size, 0, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        this.ctx.beginPath();
        this.ctx.ellipse(p.x - p.size * 0.3, p.y - p.size * 0.35, p.size * 0.2, p.size * 0.35, -Math.PI / 4, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.strokeStyle = 'rgba(200, 150, 170, 0.55)';
        this.ctx.lineWidth = 1.2;
        this.ctx.beginPath();
        this.ctx.moveTo(p.x, p.y + p.size);
        this.ctx.quadraticCurveTo(p.x + Math.sin(p.wobble) * 8, p.y + p.size + 16, p.x, p.y + p.size + 34);
        this.ctx.stroke();
        this.ctx.restore();

      } else if (p.type === 'bubble') {
        p.wobble += p.wobbleSpeed;
        p.x += Math.sin(p.wobble) * 0.7 + p.speedX;
        p.y += p.speedY;

        if (p.y < -30) {
          this.particles[i] = this.createAmbientParticle();
          this.particles[i].y = this.height + 20;
          this.particles[i].speedY = -(Math.random() * 0.9 + 0.6);
          continue;
        }

        this.ctx.save();
        this.ctx.globalAlpha = p.opacity;
        this.ctx.fillStyle = p.color;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        this.ctx.beginPath();
        this.ctx.arc(p.x - p.size * 0.3, p.y - p.size * 0.3, p.size * 0.25, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();

      } else {
        p.wobble += p.wobbleSpeed;
        p.x += Math.sin(p.wobble) * 0.7 + p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y > this.height + 30) {
          this.particles[i] = this.createAmbientParticle();
          continue;
        }

        const sprite = getEmojiSprite(p.emoji, p.size);
        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rotation);
        this.ctx.globalAlpha = p.opacity;
        this.ctx.drawImage(sprite.canvas, -sprite.width / 2, -sprite.height / 2, sprite.width, sprite.height);
        this.ctx.restore();
      }
    }

    requestAnimationFrame(this.loop);
  }
}

let particles;

// ==================== 6. HỆ THỐNG MƯA TRÁI TIM PHÁT SÁNG NEON VŨ TRỤ (SIÊU MƯỢT, 0% LAG) ====================
class UniverseEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.stars = [];
    this.meteors = [];
    this.fallingHearts = [];
    this.maxBaseHearts = 45; // Số lượng mưa tim nền liên tục
    this.isRunning = false;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.resize = this.resize.bind(this);
    this.loop = this.loop.bind(this);

    window.addEventListener('resize', this.resize, { passive: true });
    this.resize();
    this.initStars();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  initStars() {
    this.stars = [];
    const starCount = Math.floor((this.width * this.height) / 4000);
    for (let i = 0; i < starCount; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 1.5 + 0.4,
        alpha: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.008,
        color: ['#FFFFFF', '#FFD6E7', '#CDB4DB', '#BDE0FE'][Math.floor(Math.random() * 4)]
      });
    }
  }

  start() {
    this.isRunning = true;
    this.initStars();
    // Tạo sẵn đợt mưa tim phát sáng neon rơi khắp màn hình
    this.fallingHearts = [];
    for (let i = 0; i < this.maxBaseHearts; i++) {
      this.fallingHearts.push(this.createFallingHeart(true));
    }
    this.loop();
  }

  stop() {
    this.isRunning = false;
  }

  createFallingHeart(initialRandomY = false) {
    const emojis = ['💖', '💗', '💕', '❤️'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const startY = initialRandomY ? Math.random() * this.height : -(Math.random() * 100 + 40);

    return {
      x: Math.random() * this.width,
      y: startY,
      emoji: emoji,
      size: Math.random() * 14 + 20, // Kích thước trái tim
      speedY: Math.random() * 1.8 + 1.2, // Tốc độ rơi êm đềm
      speedX: (Math.random() - 0.5) * 0.6,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.035 + 0.015,
      rotation: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.35 + 0.65
    };
  }

  // Tăng cường mưa tim bão hòa rực rỡ
  boostHeartRain(count = 45) {
    for (let i = 0; i < count; i++) {
      const heart = this.createFallingHeart(false);
      heart.y = -(Math.random() * 220 + 40);
      heart.speedY = Math.random() * 2.6 + 1.8;
      this.fallingHearts.push(heart);
    }
  }

  spawnMeteor() {
    if (this.meteors.length < 2 && Math.random() < 0.018) {
      this.meteors.push({
        x: Math.random() * this.width * 0.8 + this.width * 0.1,
        y: Math.random() * this.height * 0.4,
        length: Math.random() * 90 + 70,
        speed: Math.random() * 10 + 8,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
        opacity: 1,
        color: '#FFB3D1'
      });
    }
  }

  loop() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Vẽ các vì sao ngân hà lấp lánh
    for (let s of this.stars) {
      s.alpha += s.twinkleSpeed;
      const currentAlpha = Math.abs(Math.sin(s.alpha));
      this.ctx.save();
      this.ctx.globalAlpha = currentAlpha;
      this.ctx.fillStyle = s.color;
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // 2. Vẽ sao băng
    this.spawnMeteor();
    for (let i = this.meteors.length - 1; i >= 0; i--) {
      const m = this.meteors[i];
      m.x += Math.cos(m.angle) * m.speed;
      m.y += Math.sin(m.angle) * m.speed;
      m.opacity -= 0.016;

      if (m.opacity <= 0 || m.x > this.width || m.y > this.height) {
        this.meteors.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, m.opacity);
      this.ctx.strokeStyle = m.color;
      this.ctx.lineWidth = 1.8;
      this.ctx.beginPath();
      this.ctx.moveTo(m.x, m.y);
      this.ctx.lineTo(m.x - Math.cos(m.angle) * m.length, m.y - Math.sin(m.angle) * m.length);
      this.ctx.stroke();
      this.ctx.restore();
    }

    // 3. MƯA TRÁI TIM PHÁT SÁNG NEON (Dùng Neon GPU Sprite)
    // Duy trì liên tục mưa tim bồng bềnh
    if (this.fallingHearts.length < this.maxBaseHearts) {
      this.fallingHearts.push(this.createFallingHeart(false));
    }

    for (let i = this.fallingHearts.length - 1; i >= 0; i--) {
      const h = this.fallingHearts[i];
      h.wobble += h.wobbleSpeed;
      h.x += Math.sin(h.wobble) * 0.8 + h.speedX;
      h.y += h.speedY;

      // Khi chạm đáy, tái sử dụng đưa lên đầu (Object Pooling, không tạo rác nhớ)
      if (h.y > this.height + 50) {
        if (this.fallingHearts.length > this.maxBaseHearts) {
          this.fallingHearts.splice(i, 1);
          continue;
        } else {
          h.y = -(Math.random() * 50 + 40);
          h.x = Math.random() * this.width;
          continue;
        }
      }

      const sprite = getNeonHeartSprite(h.emoji, h.size);
      this.ctx.save();
      this.ctx.translate(h.x, h.y);
      this.ctx.rotate(h.rotation);
      this.ctx.globalAlpha = h.opacity;
      this.ctx.drawImage(sprite.canvas, -sprite.offset, -sprite.offset, sprite.width, sprite.height);
      this.ctx.restore();
    }

    requestAnimationFrame(this.loop);
  }
}

let universeEngine;

// ==================== 7. DÒNG CHẢY ẢNH NGƯỜI YÊU RƠI XUỐNG VÀ LẶP ĐI LẶP LẠI ====================
class FallingPhotosManager {
  constructor(container) {
    this.container = container;
    this.cards = [];
    this.isRunning = false;
    this.animationFrameId = null;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.loop = this.loop.bind(this);
    this.resize = this.resize.bind(this);

    window.addEventListener('resize', this.resize, { passive: true });
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  init(photosList) {
    this.container.innerHTML = "";
    this.cards = [];

    const photos = (photosList && photosList.length > 0) ? photosList : CONFIG.photos;
    const cardWidth = Math.min(210, Math.floor(this.width * 0.45));
    const columnCount = Math.max(2, Math.floor(this.width / (cardWidth + 20)));

    photos.forEach((item, index) => {
      const cardEl = document.createElement('article');
      cardEl.className = 'falling-photo-card';
      cardEl.setAttribute('tabindex', '0');
      cardEl.setAttribute('aria-label', `Ảnh kỷ niệm ${index + 1}: ${item.caption}`);

      const hasImage = item.url && item.url.trim() !== "";

      if (hasImage) {
        cardEl.innerHTML = `
          <div class="photo-frame">
            <img class="photo-img" src="${item.url}" alt="${item.caption}" loading="lazy">
          </div>
          <p class="photo-caption">${item.caption}</p>
          <span class="photo-tag">${item.tag || 'KHOẢNH KHẮC NGỌT NGÀO'}</span>
        `;
        cardEl.addEventListener('click', () => {
          openLightbox(item.url, item.caption);
        });
      } else {
        cardEl.innerHTML = `
          <div class="photo-frame">
            <div class="placeholder-photo-box">
              <span class="placeholder-icon">📸</span>
              <p class="placeholder-text">Chèn ảnh của em tại đây</p>
              <p class="placeholder-subtext">Chạm để chọn ảnh từ máy của bạn ✨</p>
            </div>
          </div>
          <p class="photo-caption">${item.caption}</p>
          <span class="photo-tag">${item.tag || 'KHOẢNH KHẮC NGỌT NGÀO'}</span>
        `;
        cardEl.addEventListener('click', () => {
          DOM.photoFileInput.dataset.targetIndex = index;
          DOM.photoFileInput.click();
        });
      }

      this.container.appendChild(cardEl);

      // Phân bổ vị trí rơi so le đẹp mắt khắp màn hình
      const colIndex = index % columnCount;
      const colWidth = (this.width - cardWidth - 20) / Math.max(1, columnCount - 1);
      const baseX = 10 + colIndex * colWidth;
      const startY = (index * (this.height * 0.95 / photos.length)) - 100;

      const cardObj = {
        cardEl: cardEl,
        x: Math.max(10, Math.min(this.width - cardWidth - 10, baseX + (Math.random() - 0.5) * 30)),
        y: startY,
        speedY: Math.random() * 0.55 + 0.95, // Tốc độ rơi êm dịu
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.025 + 0.015,
        rotation: (Math.random() - 0.5) * 4,
        isHovered: false
      };

      // Tạm dừng khi di chuột hoặc chạm để bạn gái ngắm ảnh
      cardEl.addEventListener('mouseenter', () => { cardObj.isHovered = true; cardEl.classList.add('is-hovered'); });
      cardEl.addEventListener('mouseleave', () => { cardObj.isHovered = false; cardEl.classList.remove('is-hovered'); });
      cardEl.addEventListener('touchstart', () => { cardObj.isHovered = true; cardEl.classList.add('is-hovered'); }, { passive: true });
      cardEl.addEventListener('touchend', () => { setTimeout(() => { cardObj.isHovered = false; cardEl.classList.remove('is-hovered'); }, 800); }, { passive: true });

      this.cards.push(cardObj);
    });

    // Cập nhật huy hiệu số lượng ảnh
    const validCount = photos.filter(p => p.url && p.url.trim() !== "").length;
    if (DOM.photosCountBadge) {
      DOM.photosCountBadge.textContent = validCount > 0
        ? `📸 ${validCount} khoảnh khắc đáng yêu của em đang rơi`
        : `📸 6 vị trí ảnh kỷ niệm đang rơi (chạm để chèn ảnh)`;
    }
  }

  start() {
    this.isRunning = true;
    this.resize();
    if (this.cards.length === 0) {
      this.init(CONFIG.photos);
    }
    this.loop();
  }

  stop() {
    this.isRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  reload(photosList) {
    this.init(photosList);
  }

  loop() {
    if (!this.isRunning) return;

    const cardWidth = 210;
    const maxY = this.height + 150;

    for (let c of this.cards) {
      // Khi không hover, ảnh tiếp tục rơi nhẹ nhàng
      if (!c.isHovered) {
        c.y += c.speedY;
        c.wobble += c.wobbleSpeed;

        // Lặp đi lặp lại: khi ảnh rơi qua đáy màn hình, lập tức đưa trở lại đỉnh bầu trời
        if (c.y > maxY) {
          c.y = -(Math.random() * 180 + 320);
          c.x = Math.random() * Math.max(10, this.width - cardWidth - 20) + 10;
        }

        const currentX = c.x + Math.sin(c.wobble) * 12;
        const currentRot = c.rotation + Math.sin(c.wobble) * 2;

        // Dùng translate3d để tăng tốc phần cứng GPU, tuyệt đối không gây giật lag
        c.cardEl.style.transform = `translate3d(${currentX}px, ${c.y}px, 0) rotate(${currentRot}deg)`;
      }
    }

    this.animationFrameId = requestAnimationFrame(this.loop);
  }
}

let fallingPhotosManager;

// ==================== 8. BỘ PHÁT NHẠC LÃNG MẠN (LOFI SYNTH / MP3) ====================
class RomanticMusicPlayer {
  constructor() {
    this.audioElement = null;
    this.isUsingSynthesizer = false;
    this.chords = [
      [261.63, 329.63, 392.00], // C maj
      [220.00, 261.63, 329.63], // Am
      [174.61, 220.00, 261.63], // F maj
      [196.00, 246.94, 293.66], // G maj
      [164.81, 196.00, 246.94], // Em
      [220.00, 277.18, 329.63]  // A maj
    ];
    this.chordIndex = 0;
  }

  init() {
    if (CONFIG.bgMusicUrl && CONFIG.bgMusicUrl.trim() !== "") {
      this.audioElement = new Audio(CONFIG.bgMusicUrl);
      this.audioElement.loop = true;
      this.isUsingSynthesizer = false;
    } else {
      this.isUsingSynthesizer = true;
    }
  }

  play() {
    if (!this.isUsingSynthesizer && this.audioElement) {
      this.audioElement.play().then(() => {
        state.isMusicPlaying = true;
        this.updateUI(true);
      }).catch(err => {
        console.warn("Chuyển sang Web Audio Synthesizer:", err);
        this.isUsingSynthesizer = true;
        this.startSynthesizer();
      });
    } else {
      this.startSynthesizer();
    }
  }

  startSynthesizer() {
    try {
      if (!state.audioContext) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        state.audioContext = new AudioCtx();
      }

      if (state.audioContext.state === 'suspended') {
        state.audioContext.resume();
      }

      state.isMusicPlaying = true;
      this.updateUI(true);
      this.playRomanticMelodyLoop();
    } catch (e) {
      console.warn("Web Audio API không được hỗ trợ:", e);
    }
  }

  playRomanticMelodyLoop() {
    if (!state.isMusicPlaying) return;

    const chord = this.chords[this.chordIndex % this.chords.length];
    this.chordIndex++;

    chord.forEach((freq, idx) => {
      setTimeout(() => {
        if (state.isMusicPlaying) {
          this.playBellNote(freq, 1.8);
          if (idx === 1 && Math.random() > 0.4) {
            setTimeout(() => {
              if (state.isMusicPlaying) this.playBellNote(freq * 1.5, 1.2);
            }, 120);
          }
        }
      }, idx * 250);
    });

    state.musicIntervalId = setTimeout(() => {
      if (state.isMusicPlaying) this.playRomanticMelodyLoop();
    }, 1800);
  }

  playBellNote(freq, duration = 1.5) {
    if (!state.audioContext) return;
    try {
      const now = state.audioContext.currentTime;
      const osc = state.audioContext.createOscillator();
      const gain = state.audioContext.createGain();

      osc.type = Math.random() > 0.5 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.07, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(state.audioContext.destination);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    } catch (e) {
      // Bỏ qua lỗi context
    }
  }

  stop() {
    state.isMusicPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
    }
    if (state.musicIntervalId) {
      clearTimeout(state.musicIntervalId);
      state.musicIntervalId = null;
    }
    this.updateUI(false);
  }

  toggle() {
    if (state.isMusicPlaying) {
      this.stop();
      showToast("Đã tạm dừng nhạc 🔇");
    } else {
      this.play();
      showToast("Đang phát giai điệu lãng mạn 🎶");
    }
  }

  updateUI(isPlaying) {
    if (isPlaying) {
      DOM.musicToggleBtn.classList.add('playing');
      DOM.musicIcon.textContent = '🎶';
      DOM.musicText.textContent = 'Tắt nhạc';
    } else {
      DOM.musicToggleBtn.classList.remove('playing');
      DOM.musicIcon.textContent = '🎵';
      DOM.musicText.textContent = 'Bật nhạc';
    }
  }
}

let musicPlayer;

// ==================== 9. TOAST THÔNG BÁO ====================
let toastTimer = null;
function showToast(message) {
  if (!DOM.toast) return;
  DOM.toast.textContent = message;
  DOM.toast.classList.add('show');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    DOM.toast.classList.remove('show');
  }, 2400);
}

// ==================== 10. XỬ LÝ MÀN HÌNH PASSCODE ====================
function initPasscodeScreen() {
  if (DOM.passcodeBadge) {
    DOM.passcodeBadge.textContent = CONFIG.headerBadge;
  }

  DOM.keypadButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (state.isLocked) return;

      const key = btn.dataset.key;
      if (key !== undefined) {
        handleDigitInput(key);
        playKeypadFeedback(btn);
      }
    });
  });

  DOM.btnClear.addEventListener('click', () => {
    if (state.isLocked) return;
    playKeypadFeedback(DOM.btnClear);
    clearPasscode();
  });

  DOM.btnBackspace.addEventListener('click', () => {
    if (state.isLocked) return;
    playKeypadFeedback(DOM.btnBackspace);
    deleteLastDigit();
  });

  DOM.btnUnlock.addEventListener('click', () => {
    if (state.isLocked) return;
    verifyPasscode();
  });

  document.addEventListener('keydown', handlePhysicalKeyboard);
}

function handlePhysicalKeyboard(e) {
  if (!DOM.passcodeScreen.classList.contains('active') || state.isLocked) return;

  if (e.key >= '0' && e.key <= '9') {
    handleDigitInput(e.key);
    const btn = Array.from(DOM.keypadButtons).find(b => b.dataset.key === e.key);
    if (btn) playKeypadFeedback(btn);
  } else if (e.key === 'Backspace') {
    deleteLastDigit();
    playKeypadFeedback(DOM.btnBackspace);
  } else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
    clearPasscode();
    playKeypadFeedback(DOM.btnClear);
  } else if (e.key === 'Enter') {
    verifyPasscode();
  }
}

function playKeypadFeedback(btn) {
  btn.classList.add('pressed');
  setTimeout(() => btn.classList.remove('pressed'), 160);
}

function handleDigitInput(digit) {
  if (state.currentPasscode.length >= 4) return;

  state.currentPasscode += digit;
  updatePasscodeDots();

  if (state.currentPasscode.length === 4) {
    setTimeout(verifyPasscode, 200);
  }
}

function deleteLastDigit() {
  if (state.currentPasscode.length > 0) {
    state.currentPasscode = state.currentPasscode.slice(0, -1);
    updatePasscodeDots();
    clearFeedback();
  }
}

function clearPasscode() {
  state.currentPasscode = "";
  updatePasscodeDots();
  clearFeedback();
}

function updatePasscodeDots() {
  DOM.passcodeDots.forEach((dot, index) => {
    if (index < state.currentPasscode.length) {
      dot.classList.add('filled');
    } else {
      dot.classList.remove('filled', 'error', 'success');
    }
  });
}

function clearFeedback() {
  DOM.passcodeFeedback.textContent = "";
  DOM.passcodeFeedback.className = "feedback-text";
  DOM.dotsContainer.classList.remove('shake');
}

function verifyPasscode() {
  if (state.currentPasscode.length === 0) {
    DOM.passcodeFeedback.textContent = "Bé hãy nhập mật mã bí mật trước nhé! 💕";
    DOM.passcodeFeedback.className = "feedback-text error";
    return;
  }

  if (state.currentPasscode === CONFIG.passcode) {
    state.isLocked = true;
    DOM.passcodeFeedback.textContent = "Đúng rồi, cô gái giỏi nhất của anh! Mở món quà thôi nào 💐";
    DOM.passcodeFeedback.className = "feedback-text success";

    DOM.passcodeDots.forEach(dot => {
      dot.classList.remove('error');
      dot.classList.add('success');
    });

    const rect = DOM.dotsContainer.getBoundingClientRect();
    particles.burstFlowersAndHearts(rect.left + rect.width / 2, rect.top, 20);

    setTimeout(() => {
      transitionScreen(DOM.passcodeScreen, DOM.giftScreen, () => {
        state.isLocked = false;
      });
    }, 950);

  } else {
    DOM.passcodeFeedback.textContent = "Hí hí, chưa đúng rồi bé ơi! Thử lại nhé 💕";
    DOM.passcodeFeedback.className = "feedback-text error";

    DOM.dotsContainer.classList.add('shake');
    DOM.passcodeDots.forEach(dot => {
      if (dot.classList.contains('filled')) {
        dot.classList.add('error');
      }
    });

    setTimeout(() => {
      clearPasscode();
    }, 700);
  }
}

// ==================== 11. CHUYỂN CẢNH MƯỢT MÀ LIỀN MẠCH ====================
function transitionScreen(fromScreen, toScreen, onComplete) {
  fromScreen.classList.add('exiting');

  setTimeout(() => {
    fromScreen.classList.remove('active', 'exiting');
    fromScreen.style.display = 'none';

    toScreen.style.display = 'flex';
    void toScreen.offsetHeight;
    toScreen.classList.add('active');

    if (typeof onComplete === 'function') {
      onComplete();
    }
  }, 480);
}

// ==================== 12. MỞ HỘP QUÀ 3D ====================
function initGiftBoxScreen() {
  const openGiftHandler = () => {
    if (state.hasGiftOpened) return;
    state.hasGiftOpened = true;

    DOM.giftBoxInteractive.classList.add('opened');
    DOM.giftLightBurst.classList.add('active');

    const boxRect = DOM.giftBoxInteractive.getBoundingClientRect();
    const originX = boxRect.left + boxRect.width / 2;
    const originY = boxRect.top + boxRect.height * 0.35;

    particles.burstConfetti(originX, originY, 80);
    particles.burstFlowersAndHearts(originX, originY, 36);
    particles.spawnBalloonsFromBox(originX, originY, 15);

    if (!state.isMusicPlaying) {
      musicPlayer.play();
    }

    showToast("Món quà mở ra với trọn vẹn yêu thương... 💌✨");

    setTimeout(() => {
      transitionScreen(DOM.giftScreen, DOM.letterScreen, () => {
        startLetterTypewriter();
      });
    }, 1500);
  };

  DOM.btnOpenGift.addEventListener('click', openGiftHandler);
  DOM.giftBoxInteractive.addEventListener('click', openGiftHandler);
  DOM.giftBoxInteractive.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openGiftHandler();
    }
  });
}

// ==================== 13. HIỆU ỨNG ĐÁNH MÁY BỨC THƯ TÌNH ====================
function initLetterScreen() {
  DOM.letterTitle.textContent = CONFIG.letterTitle;
  DOM.letterSubtitle.textContent = CONFIG.letterSubtitle;
  DOM.letterQuote.textContent = CONFIG.handwritingQuote;
  DOM.senderDisplayName.textContent = `${CONFIG.senderName} 💌`;

  // Nhấn vào bức thư để đọc ngay
  DOM.letterCard.addEventListener('click', (e) => {
    if (e.target.closest('.letter-interaction-toolbar') || e.target.closest('button')) return;

    if (state.isTyping) {
      finishTypewriterInstantly();
      showToast("Đã mở toàn bộ nội dung bức thư 💖");
    }
  });

  DOM.btnSendHeart.addEventListener('click', triggerSendHeart);
  DOM.btnSendBouquet.addEventListener('click', triggerSendBouquet);
  DOM.btnReplayLetter.addEventListener('click', () => {
    startLetterTypewriter();
    showToast("Đang đọc lại thư từ đầu... 💌");
  });

  // Nút bước vào Không Gian Vũ Trụ Tình Yêu
  DOM.btnEnterUniverse.addEventListener('click', () => {
    enterUniverseRealm();
  });
}

function startLetterTypewriter() {
  if (state.typingTimeoutId) {
    clearTimeout(state.typingTimeoutId);
    state.typingTimeoutId = null;
  }

  DOM.letterContent.innerHTML = "";
  DOM.typingCursor.classList.remove('finished');
  state.isTyping = true;

  const rawText = CONFIG.letterContent;
  let charIndex = 0;

  function typeNextStep() {
    if (!state.isTyping) return;

    if (charIndex < rawText.length) {
      const stepCount = (rawText.length - charIndex > 300) ? 2 : 1;

      for (let s = 0; s < stepCount && charIndex < rawText.length; s++) {
        const char = rawText[charIndex];
        if (char === '\n') {
          DOM.letterContent.appendChild(document.createElement('br'));
        } else {
          DOM.letterContent.appendChild(document.createTextNode(char));
        }
        charIndex++;
      }

      if (!state.scrollPending && DOM.letterBodyContainer) {
        state.scrollPending = true;
        requestAnimationFrame(() => {
          if (DOM.letterBodyContainer) {
            DOM.letterBodyContainer.scrollTop = DOM.letterBodyContainer.scrollHeight;
          }
          state.scrollPending = false;
        });
      }

      state.typingTimeoutId = setTimeout(typeNextStep, CONFIG.typingSpeed);
    } else {
      finishTypewriterInstantly();
    }
  }

  typeNextStep();
}

function finishTypewriterInstantly() {
  if (state.typingTimeoutId) {
    clearTimeout(state.typingTimeoutId);
    state.typingTimeoutId = null;
  }

  state.isTyping = false;
  DOM.typingCursor.classList.add('finished');

  let formattedHtml = CONFIG.letterContent.replace(/\n/g, '<br>');

  const boldPhrases = [
    "Cảm ơn em vì đã là em. Mong rằng chúng ta sẽ còn có thật nhiều ngày tháng đẹp đẽ bên nhau, cùng cười, cùng cố gắng và cùng tạo nên những kỷ niệm mà sau này nhớ lại vẫn thấy thật hạnh phúc.",
    "Chúc cô gái anh thương có một ngày 20/11 thật vui vẻ và đáng nhớ!",
    "Thương em nhiều lắm! ❤️"
  ];

  boldPhrases.forEach(phrase => {
    if (formattedHtml.includes(phrase)) {
      formattedHtml = formattedHtml.replace(phrase, `<strong>${phrase}</strong>`);
    }
  });

  DOM.letterContent.innerHTML = formattedHtml;

  if (DOM.letterBodyContainer) {
    DOM.letterBodyContainer.scrollTop = DOM.letterBodyContainer.scrollHeight;
  }

  const rect = DOM.letterCard.getBoundingClientRect();
  particles.burstFlowersAndHearts(rect.left + rect.width / 2, rect.bottom - 40, 16);
}

// ==================== 14. KHÔNG GIAN VŨ TRỤ ĐEN: MƯA TIM NEON & MƯA ẢNH RƠI LẶP LẠI ====================
function initUniverseScreen() {
  // Nút thêm ảnh từ máy
  DOM.btnAddPhotos.addEventListener('click', () => {
    DOM.photoFileInput.click();
  });

  DOM.photoFileInput.addEventListener('change', handleLocalPhotoUpload);

  // Nút kích hoạt cơn mưa tim bão hòa rực rỡ
  DOM.btnUniverseRainHearts.addEventListener('click', () => {
    universeEngine.boostHeartRain(50);
    showToast("Cơn mưa tim bão hòa rực rỡ khắp vũ trụ! 💖✨");
  });

  // Nút trở về bức thư tình
  DOM.btnBackToLetter.addEventListener('click', () => {
    state.isUniverseActive = false;
    universeEngine.stop();
    fallingPhotosManager.stop();

    particles.isRunning = true;
    particles.loop();

    transitionScreen(DOM.universeScreen, DOM.letterScreen, () => {
      showToast("Đã trở về bức thư tình yêu 💌");
    });
  });

  // Đóng Lightbox
  DOM.lightboxClose.addEventListener('click', closeLightbox);
  DOM.lightboxBackdrop.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && DOM.photoLightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

// BƯỚC VÀO VŨ TRỤ TÌNH YÊU
function enterUniverseRealm() {
  state.isUniverseActive = true;
  particles.isRunning = false;

  transitionScreen(DOM.letterScreen, DOM.universeScreen, () => {
    // 1. TỰ ĐỘNG PHÁT CƠN MƯA TRÁI TIM PHÁT SÁNG NEON LIÊN TỤC
    universeEngine.start();
    universeEngine.boostHeartRain(40);

    // 2. TỰ ĐỘNG CHO CÁC BỨC ẢNH NGƯỜI YÊU RƠI XUỐNG CÙNG VÀ LẶP ĐI LẶP LẠI
    fallingPhotosManager.start();

    // 3. Phát nhạc nếu chưa bật
    if (!state.isMusicPlaying) {
      musicPlayer.play();
    }

    showToast("Mưa tim và kỷ niệm đang rơi dành riêng cho em! 🌌💖");
  });
}

// Xử lý nạp ảnh trực tiếp từ máy
function handleLocalPhotoUpload(e) {
  const files = Array.from(e.target.files);
  if (!files || files.length === 0) return;

  const targetIndex = DOM.photoFileInput.dataset.targetIndex;

  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;

      if (targetIndex !== undefined && targetIndex !== "") {
        const idx = parseInt(targetIndex, 10);
        if (CONFIG.photos[idx]) {
          CONFIG.photos[idx].url = dataUrl;
        }
        delete DOM.photoFileInput.dataset.targetIndex;
      } else {
        const emptyIndex = CONFIG.photos.findIndex(p => !p.url || p.url.trim() === "");
        if (emptyIndex !== -1) {
          CONFIG.photos[emptyIndex].url = dataUrl;
        } else {
          CONFIG.photos.push({
            url: dataUrl,
            caption: `Khoảnh khắc rạng rỡ của em 💖`,
            tag: "BỘ SƯU TẬP TÌNH YÊU"
          });
        }
      }

      // Nạp lại dòng chảy ảnh đang rơi ngay lập tức
      fallingPhotosManager.reload(CONFIG.photos);
      showToast("Đã đưa ảnh vào dòng chảy kỷ niệm vũ trụ! 📸✨");
    };
    reader.readAsDataURL(file);
  });

  e.target.value = "";
}

function openLightbox(url, caption) {
  DOM.lightboxImg.src = url;
  DOM.lightboxCaption.textContent = caption || "";
  DOM.photoLightbox.classList.add('active');
  DOM.photoLightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  DOM.photoLightbox.classList.remove('active');
  DOM.photoLightbox.setAttribute('aria-hidden', 'true');
  DOM.lightboxImg.src = "";
}

// ==================== 15. CÁC NÚT TƯƠNG TÁC TẠI THƯ ====================
function triggerSendHeart(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  const startX = rect.left + rect.width / 2;
  const startY = rect.top;

  createFloatingElements(['💗', '💕', '💖', '❤️', '🫶'], startX, startY, 10);
  particles.burstFlowersAndHearts(startX, startY, 14);
  showToast("Anh nhận được tình yêu của em rồi! 💕");
}

function triggerSendBouquet(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  const startX = rect.left + rect.width / 2;
  const startY = rect.top;

  createFloatingElements(['🌹', '🌷', '🌸', '💐', '🌺', '✨'], startX, startY, 12);
  particles.burstFlowersAndHearts(startX, startY, 26);
  particles.burstConfetti(startX, startY, 35);
  showToast("Gửi tặng em cả một vườn hoa tươi thắm nhất! 💐🌹");
}

function createFloatingElements(items, x, y, count = 8) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'floating-click-element';
    el.textContent = items[Math.floor(Math.random() * items.length)];

    const offsetX = (Math.random() - 0.5) * 60;
    const offsetY = (Math.random() - 0.5) * 20;
    el.style.left = `${x + offsetX}px`;
    el.style.top = `${y + offsetY}px`;

    const tx = (Math.random() - 0.5) * 160;
    const rot = (Math.random() - 0.5) * 60;
    el.style.setProperty('--tx', `${tx}px`);
    el.style.setProperty('--rot', `${rot}deg`);

    document.body.appendChild(el);

    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 1800);
  }
}

// ==================== 16. KHỞI TẠO TOÀN BỘ ỨNG DỤNG ====================
document.addEventListener('DOMContentLoaded', () => {
  particles = new ParticleEngine(DOM.canvas);
  universeEngine = new UniverseEngine(DOM.universeCanvas);
  fallingPhotosManager = new FallingPhotosManager(DOM.fallingPhotosStream);

  musicPlayer = new RomanticMusicPlayer();
  musicPlayer.init();

  DOM.musicToggleBtn.addEventListener('click', () => {
    musicPlayer.toggle();
  });

  initPasscodeScreen();
  initGiftBoxScreen();
  initLetterScreen();
  initUniverseScreen();

  console.log("🌸 Website Hộp Quà Tình Yêu 20/11 & Vũ Trụ Kỷ Niệm sẵn sàng! Mật mã:", CONFIG.passcode);
});
