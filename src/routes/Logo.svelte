<!--
@component
「Écriture ちょっと待ってくれよ」のロゴ。

claudeで生成したものを修正

hoverでのCSSアニメーションが設定されている。
-->
<svg role="img" aria-label="ロゴ" width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <!-- グラデーション定義：左上から右下への透明度変化 -->
        <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" class="stop0" style="stop-color:#ff3e00;stop-opacity:0.8" />
            <stop offset="50%" class="stop1" style="stop-color:#ff3e00;stop-opacity:0.5" />
            <stop offset="55%" class="stop2" style="stop-color:#ff3e00;stop-opacity:0.3" />
            <stop offset="65%" class="stop3" style="stop-color:#ff3e00;stop-opacity:0.1" />
            <stop offset="100%" class="stop4" style="stop-color:#ff3e00;stop-opacity:0" />
        </linearGradient>

        <!-- マスク定義：文字「É」の形状 -->
        <mask id="letterMask">
        <rect width="200" height="200" fill="black"/>
        <text x="100" y="150" text-anchor="middle" font-family="Arial, sans-serif" font-size="140" font-weight="bold" fill="white">É</text>
        </mask>
    </defs>

    <!-- 背景 -->
    <rect width="200" height="200" fill="transparent"/>

    <!-- メインの「É」文字（グラデーション付き） -->
    <rect width="200" height="200" fill="url(#fadeGradient)" mask="url(#letterMask)"/>

    <!-- 塵のような粒子効果 -->
    <!-- 左上部分（濃い粒子） -->
    <circle cx="85" cy="45" r="1.5" fill="#ff3e00" opacity="0.8"/>
    <circle cx="92" cy="52" r="1" fill="#ff3e00" opacity="0.7"/>
    <circle cx="78" cy="58" r="1.2" fill="#ff3e00" opacity="0.6"/>

    <!-- 中央部分（中程度の粒子） -->
    <circle cx="105" cy="85" r="1" fill="#ff3e00" opacity="0.5"/>
    <circle cx="98" cy="92" r="0.8" fill="#ff3e00" opacity="0.4"/>
    <circle cx="112" cy="88" r="1.2" fill="#ff3e00" opacity="0.4"/>
    <circle cx="88" cy="95" r="0.9" fill="#ff3e00" opacity="0.3"/>

    <!-- 右下部分（薄い粒子） -->
    <circle cx="125" cy="125" r="0.8" fill="#ff3e00" opacity="0.3"/>
    <circle cx="132" cy="118" r="0.6" fill="#ff3e00" opacity="0.2"/>
    <circle cx="118" cy="135" r="0.7" fill="#ff3e00" opacity="0.2"/>
    <circle cx="140" cy="130" r="0.5" fill="#ff3e00" opacity="0.15"/>
    <circle cx="128" cy="142" r="0.6" fill="#ff3e00" opacity="0.15"/>
    
    <!-- より右下の散らばった粒子 -->
    <circle cx="148" cy="145" r="0.4" fill="#ff3e00" opacity="0.1"/>
    <circle cx="155" cy="152" r="0.3" fill="#ff3e00" opacity="0.08"/>
    <circle cx="142" cy="158" r="0.4" fill="#ff3e00" opacity="0.08"/>
    <circle cx="162" cy="148" r="0.3" fill="#ff3e00" opacity="0.06"/>
    <circle cx="150" cy="165" r="0.3" fill="#ff3e00" opacity="0.06"/>
    <circle cx="168" cy="162" r="0.2" fill="#ff3e00" opacity="0.04"/>
    <circle cx="158" cy="172" r="0.2" fill="#ff3e00" opacity="0.04"/>
    
    <!-- 最も右下の微細な粒子 -->
    <circle cx="175" cy="175" r="0.2" fill="#ff3e00" opacity="0.03"/>
    <circle cx="182" cy="168" r="0.15" fill="#ff3e00" opacity="0.02"/>
    <circle cx="172" cy="185" r="0.15" fill="#ff3e00" opacity="0.02"/>
    <circle cx="188" cy="182" r="0.1" fill="#ff3e00" opacity="0.01"/>
    
    <!-- 追加の細かい粒子（より自然な散らばりを演出） -->
    <circle cx="108" cy="72" r="0.7" fill="#ff3e00" opacity="0.4"/>
    <circle cx="122" cy="98" r="0.5" fill="#ff3e00" opacity="0.3"/>
    <circle cx="135" cy="112" r="0.6" fill="#ff3e00" opacity="0.25"/>
    <circle cx="145" cy="125" r="0.4" fill="#ff3e00" opacity="0.2"/>
    <circle cx="155" cy="138" r="0.3" fill="#ff3e00" opacity="0.15"/>
    <circle cx="165" cy="155" r="0.25" fill="#ff3e00" opacity="0.1"/>
</svg>

<style>
	svg {
		display: inline;
		width: 40px;
		height: 40px;
	}

	@media (min-width: 720px) {
		svg {
			width: 80px;
			height: 80px;
		}
	}

	svg:hover .stop0 {
		animation-name: onmouse0;
		animation-duration: 1s;
		animation-timing-function: ease-in-out;
		animation-fill-mode: forwards;
	}

    svg:hover .stop1 {
		animation-name: onmouse1;
		animation-duration: 1s;
		animation-timing-function: ease-in-out;
		animation-fill-mode: forwards;
	}

    svg:hover .stop2 {
		animation-name: onmouse2;
		animation-duration: 1s;
		animation-timing-function: ease-in-out;
		animation-fill-mode: forwards;
	}

    svg:hover .stop3 {
		animation-name: onmouse3;
		animation-duration: 1s;
		animation-timing-function: ease-in-out;
		animation-fill-mode: forwards;
	}

    svg:hover .stop4 {
		animation-name: onmouse4;
		animation-duration: 1s;
		animation-timing-function: ease-in-out;
		animation-fill-mode: forwards;
	}

	@keyframes onmouse0 {
		0% {
			stop-opacity: 0.8;
		}
		15% {
			stop-opacity: 0.5;
		}
		30% {
			stop-opacity: 0.8;
		}
		45% {
			stop-opacity: 1;
		}
		100% {
			stop-opacity: 1;
		}
	}

    @keyframes onmouse1 {
		0% {
			stop-opacity: 0.5;
		}
		15% {
			stop-opacity: 0.3;
		}
		30% {
			stop-opacity: 0.5;
		}
		45% {
			stop-opacity: 0.8;
		}
        60% {
            stop-opacity: 1;
        }
		100% {
			stop-opacity: 1;
		}
	}

    @keyframes onmouse2 {
		0% {
			stop-opacity: 0.3;
		}
		15% {
			stop-opacity: 0.1;
		}
		30% {
			stop-opacity: 0.3;
		}
		45% {
			stop-opacity: 0.5;
		}
        60% {
            stop-opacity: 0.8;
        }
        75% {
            stop-opacity: 1;
        }
		100% {
			stop-opacity: 1;
		}
	}

    @keyframes onmouse3 {
		0% {
			stop-opacity: 0.1;
		}
		15% {
			stop-opacity: 0;
		}
		30% {
			stop-opacity: 0.1;
		}
		45% {
			stop-opacity: 0.3;
		}
        60% {
            stop-opacity: 0.5;
        }
        75% {
            stop-opacity: 0.8;
        }
        90% {
            stop-opacity: 1;
        }
		100% {
			stop-opacity: 1;
		}
	}
    
    @keyframes onmouse4 {
		0% {
			stop-opacity: 0;
		}
		15% {
			stop-opacity: 0;
		}
		30% {
			stop-opacity: 0;
		}
		45% {
			stop-opacity: 0.1;
		}
        60% {
            stop-opacity: 0.3;
        }
        75% {
            stop-opacity: 0.5;
        }
        90% {
            stop-opacity: 0.8;
        }
		100% {
			stop-opacity: 1;
		}
	}
</style>
