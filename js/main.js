'use strict';

// imageのパスを定数配列として定義
const images = [
	'img/pic00.png',
	'img/pic01.png',
	'img/pic02.png',
	'img/pic03.png',
	'img/pic04.png',
	'img/pic05.png',
	'img/pic06.png',
	'img/pic07.png',
];

let currentIndex = 0;

const mainImage = document.getElementById('main'); // メイン画像のHTML要素を取得
mainImage.src = images[currentIndex]; // mainImage要素に画像を挿入

// images配列の各要素に以下の処理を実行(引数：image)
images.forEach((image, index) => {
	// img要素を作成
	const img = document.createElement('img');
	// imgのsrc属性に画像のパスを設定
	img.src = image;
	// li要素を作成
	const li = document.createElement('li');

	if (index === currentIndex) {
		li.classList.add('current');
	}
	li.addEventListener('click', () => {
		//mainImage要素にクリックした画像を表示
		mainImage.src = image;
		// thumbnailsクラスの子要素liを定数thumbnailsとして全て取得
		const thumbnails = document.querySelectorAll('.thumbnails > li');
		thumbnails[currentIndex].classList.remove('current');
		currentIndex = index;
		thumbnails[currentIndex].classList.add('current');
	});
	// liの子要素としてimgを追加
	li.appendChild(img);

	// .thumbnailsの子要素として上記のliを追加
	document.querySelector('.thumbnails').appendChild(li);
});

const next = document.getElementById('next');
next.addEventListener('click', () => {
	let target = currentIndex + 1;
	if (target === images.length) {
		target = 0;
	}
	document.querySelectorAll('.thumbnails > li')[target].click();
});

const prev = document.getElementById('prev');
prev.addEventListener('click', () => {
	let target = currentIndex - 1;
	if (target < 0) {
		target = images.length - 1;
	}
	document.querySelectorAll('.thumbnails > li')[target].click();
});

let timeoutId;

function playSlideshow() {
	timeoutId = setTimeout(() => {
		next.click();
		playSlideshow();
	}, 2000);
}

let isPlaying = false;

const play = document.getElementById('play');
play.addEventListener('click', () => {
	if (isPlaying === false) {
		playSlideshow();
		play.textContent = 'Pause';
	} else {
		clearTimeout(timeoutId);
		play.textContent = 'Play';
	}
	isPlaying = !isPlaying;
});
