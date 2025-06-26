<svelte:head>
	<title>About Écriture ちょっと待ってくれよ</title>
	<meta name="description" content="About Écriture ちょっと待ってくれよ" />
</svelte:head>

<article class="text-column">
	<div>
		<h2>このアプリについて</h2>
		<p>このアプリは、「
			<a href="https://ja.wikipedia.org/wiki/%E8%87%AA%E5%8B%95%E6%9B%B8%E8%A8%98" target="_blank">
				自動書記（エクリチュール・オートマティック）
			</a>」を行うためのエディタである。
		</p>
		<p>自動書記とは、自分の意思を離れて文字を書く一種の超常現象である。</p>
		<p>通常は、何らかの憑依現象がその説明として持ち出される。</p>
		<p>
			これを手法へと転化したのが、シュルレアリスムの「オートマティスム」である。
			これは、できるだけ（常軌を逸するような）速さで文章を書くことで、
			美意識や倫理観のような意識が邪魔をしないような文章を書く文学実験であった。
			これによって、シュルレアリストたちは、自分たちが過ごす通常の現実の内部にある、
			現実を越えた現実、過剰な現実、「超現実」が露わになると考えたのだ。
		</p>
		<p>
			このアプリでは、文章を編集し続けないと、文章を消してしまうことにより、
			強制的に自動書記をさせることを実現している。
		</p>
		<p>
			日本語で自動書記を行う場合、タッチタイピングは必須になるので、もしまだできない人は、
			タイピングの練習をするべきかもしれない。
		</p>
	</div>
	<hr />
	<div>
		<h2>インストール方法</h2>
		<p>
			このwebアプリは<a href="https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps" target="_blank">プログレッシブウェブアプリ (PWA)</a>なので、
			端末にインストールして、完全にオフラインで使うことができます。
		</p>
		<ul>
			<li>
				デスクトップの場合は、ブラウザで開いたときにアドレスバーの右側にダウンロードボタンが表示されるはずです。
				それを押せば、端末にインストールされ、OSからアプリとして実行できます。
			</li>
			<li>
				androidでは、chromeでアクセスすれば、インストールの通知が表示され、インストールすれば、アプリとして使うことができます。
			</li>
			<li>
				iOSではsafariを使って開き、共有ボタンで「ホーム画面に追加」をすることで、アプリとして使うことができます。
			</li>
		</ul>
	</div>
	<hr />
	<div>
		<h2>メタ情報</h2>
		<table>
			<tbody>
				<tr>
					<th>公開:</th>
					<td>2025/06/26</td>
				</tr>
				<tr>
					<th>最終更新:</th>
					<td>2025/06/26</td>
				</tr>
			</tbody>
		</table>
		<p>
			このアプリは<a href="https://svelte.dev/docs/kit">SvelteKit/Svelte</a>によって構築され、
			ソースコードはgithub上の<a href="https://github.com/tannakaken/ecriture-chottomattekureyo" target="_blank">リポジトリ</a>に公開されている。
		</p>
	</div>
	<hr />
	<div>
	<h2>作者情報</h2>
		<table>
			<tbody>
				<tr>
					<th>
						author:
					</th>
					<td>
						<a href="https://tannakaken.xyz" target="_blank">tannakaken</a>
					</td>
				</tr>
				<tr>
					<th>
						github:
					</th>
					<td>
						<a href="https://github.com/tannakaken" target="_blank">tannakaken</a>
					</td>
				</tr>
				<tr>
					<th>
						twitter:
					</th>
					<td>
						<a href="https://x.com/tannakaken" target="_blank">@tannakaken</a>
					</td>
				</tr>
				<tr>
					<th>
						bluesky:
					</th>
					<td>
						<a href="https://bsky.app/profile/tannakaken.xyz" target="_blank">@tannakaken.xyz</a>
					</td>
				</tr>
				<tr>
					<th>
						email:
					</th>
					<td>
						<a href="mailto:tannakaken@gmail.com" target="_blank">tannakaken@gmail.com</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</article>

<style>
	h2 {
		font-size: 1.4rem;
		text-indent: 1rem;
	}

	hr {
		margin-top: 5px;
		margin-bottom: 5px;
	}
	table {
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 1rem;
	}

	th {
		text-align: right;
	}

	td {
		text-align: left;
	}
</style>
