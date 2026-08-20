<script setup lang="ts">
import { BookMarked, MoonStar } from '@lucide/vue'
</script>

<template>
  <section class="page-intro page-width">
    <p class="eyebrow">NOVEL</p>
    <h1>我只是來打工的，<br />沒人說過工作內容會變成這樣吧？</h1>
    <p class="page-intro__lead">
      以黑暗懸疑、臥底、身分置換與身分認同為核心的長篇小說。
      本頁目前只呈現專案資訊，不包含或改寫正式正文。
    </p>
  </section>

  <section class="info-band">
    <div class="page-width info-layout">
      <div>
        <MoonStar :size="24" aria-hidden="true" />
        <p class="eyebrow">PROJECT</p>
        <h2>Frostmoon</h2>
      </div>
      <dl class="novel-facts">
        <div><dt>類型</dt><dd>成人向黑暗懸疑</dd></div>
        <div><dt>敘事</dt><dd>第一人稱近距離</dd></div>
        <div><dt>狀態</dt><dd>第一季連載中</dd></div>
      </dl>
    </div>
  </section>

  <section class="page-width section-space">
    <div class="section-heading">
      <div>
        <p class="eyebrow">STORY ARCS</p>
        <h2>篇章規劃</h2>
      </div>
      <BookMarked :size="24" aria-hidden="true" />
    </div>
    <ol class="arc-list">
      <li><span>01</span><strong>雙月苑</strong></li>
      <li><span>02</span><strong>克萊因學院</strong></li>
      <li><span>03</span><strong>未定</strong></li>
    </ol>
  </section>
</template>
