<template>
  <div class="row" :style="{ animationDelay: delay + 's' }">
    <img :src="`https://flagcdn.com/48x36/${flag}.png`" :alt="code" class="flag" />
    <div class="labels">
      <span class="name-en">{{ nameEn }}</span>
      <span class="name-fr">{{ name }}</span>
    </div>
    <span class="code">{{ code }}</span>
    <span class="amount">{{ amount }}</span>
  </div>
</template>

<script>
export default {
  name: 'CurrencyCard',
  props: {
    code:   { type: String, required: true },
    name:   { type: String, required: true },
    nameEn: { type: String, required: true },
    flag:   { type: String, required: true },
    amount: { type: String, required: true },
    delay:  { type: Number, default: 0 }
  }
}
</script>

<style scoped>
.row {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  padding: 10px 16px;
  animation: fadeUp 0.5s ease both;
  transition: background 0.2s;
}

.row:hover {
  background: rgba(255, 255, 255, 0.14);
}

.flag {
  width: 48px;
  height: 36px;
  object-fit: cover;
  border-radius: 3px;
  flex-shrink: 0;
  box-shadow: 0 1px 4px rgba(0,0,0,0.3);
}

.labels {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.name-en {
  color: white;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.name-fr {
  color: rgba(255, 255, 255, 0.55);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.code {
  color: white;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 1px;
  flex-shrink: 0;
  min-width: 36px;
  text-align: right;
}

.amount {
  color: #7dd3fc;
  font-size: 15px;
  font-weight: 600;
  flex-shrink: 0;
  min-width: 80px;
  text-align: right;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>