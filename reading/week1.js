let week1Cards = null;

async function loadWeek1Cards() {
  const root = document.getElementById("week1Cards");
  if (!root) return;

  try {
    const response = await fetch("data/week1_cards.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    week1Cards = await response.json();
    renderWeek1Cards();
  } catch (error) {
    root.innerHTML = `<div class="card"><strong>第一周学习卡暂时加载失败</strong><p class="muted small">请刷新页面，或确认 data/week1_cards.json 已发布。</p></div>`;
    console.error("Failed to load week one cards:", error);
  }
}

function week1List(items) {
  return `<ul>${items.map(item => `<li>${esc(item)}</li>`).join("")}</ul>`;
}

function knowledgeTreeText(tree) {
  const lines = [];
  for (const [key, value] of Object.entries(tree)) {
    lines.push(key);
    if (Array.isArray(value)) {
      value.forEach(item => lines.push(`  ├─ ${item}`));
      continue;
    }
    for (const [subKey, subValue] of Object.entries(value)) {
      lines.push(`  ├─ ${subKey}`);
      subValue.forEach(item => lines.push(`  │  ├─ ${item}`));
    }
  }
  return lines.join("\n");
}

function renderWeek1Cards() {
  const root = document.getElementById("week1Cards");
  if (!root || !week1Cards) return;

  root.innerHTML = `
    <div class="week1-panel">
      <div class="week1-overview">
        <section class="card week1-goals">
          <span class="badge">第一周目标</span>
          <h3>${esc(week1Cards.title)}</h3>
          ${week1List(week1Cards.weekly_goal)}
        </section>
        <section class="card week1-tree">
          <span class="badge">知识树</span>
          <pre>${esc(knowledgeTreeText(week1Cards.knowledge_tree))}</pre>
        </section>
      </div>
      <div class="week1-source-note">${esc(week1Cards.source_note)}</div>
      <div class="week1-card-grid">
        ${week1Cards.cards.map((card, index) => `
          <article class="card week1-card" data-day="${card.day}">
            <div class="week1-card-head">
              <div>
                <span class="badge">第 ${card.day} 天</span>
                <h3>${esc(card.title)}</h3>
              </div>
              <span class="chip">书内 ${esc(card.book_pages)} 页</span>
            </div>
            <div class="week1-card-section">
              <strong>阅读范围</strong>
              ${week1List(card.read)}
            </div>
            <div class="week1-card-section">
              <strong>带着这些问题读</strong>
              ${week1List(card.core_questions)}
            </div>
            <div class="week1-card-section">
              <strong>当天输出</strong>
              <div>${esc(card.output)}</div>
            </div>
            <div class="week1-card-section">
              <strong>工程映射</strong>
              ${week1List(card.engineering_mapping)}
            </div>
            <div class="week1-card-section">
              <strong>闭卷自检</strong>
              ${week1List(card.self_test)}
            </div>
            <div class="actions">
              <button class="primary" onclick="startWeek1Card(${index})">使用这张卡开始记录</button>
            </div>
          </article>
        `).join("")}
      </div>
    </div>
  `;
}

function startWeek1Card(index) {
  if (!week1Cards || !week1Cards.cards[index]) return;
  const card = week1Cards.cards[index];
  const [pageFrom, pageTo] = card.book_pages.split("-");

  document.getElementById("chapter").value = String(card.chapter_index);
  document.getElementById("pageFrom").value = pageFrom || "";
  document.getElementById("pageTo").value = pageTo || pageFrom || "";
  document.getElementById("topic").value = card.title;
  document.getElementById("keypoints").value = card.core_questions
    .slice(0, 3)
    .map((item, i) => `${i + 1}. ${item}`)
    .join("\n");
  document.getElementById("mapping").value = card.engineering_mapping.join("\n");
  document.getElementById("question").value = card.self_test[0] || "";
  document.getElementById("summary").focus();
  document.getElementById("checkin").scrollIntoView({ behavior: "smooth" });
  toast(`已载入第 ${card.day} 天学习卡`);
}

document.addEventListener("DOMContentLoaded", loadWeek1Cards);
