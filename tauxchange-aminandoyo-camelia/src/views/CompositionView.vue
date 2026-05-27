<template>
  <div class="board">

    <div class="header">
      <h1>BUREAU DE CHANGE</h1>
      <p class="subtitle">EXCHANGE OFFICE</p>
      <div class="input-wrap">
        <label for="xpf">Montant en XPF</label>
        <input id="xpf" type="number" v-model.number="xpfAmount" min="0" />
      </div>
      <p class="update" v-if="lastUpdate">Mise à jour : {{ lastUpdate }}</p>
    </div>

    <div class="table-grid">
      <CurrencyCard
        v-for="(c, i) in convertedRates"
        :key="c.code"
        :code="c.code"
        :name="currencyNames[c.code]"
        :nameEn="currencyNamesEn[c.code]"
        :flag="flagMap[c.code]"
        :amount="c.amount"
        :delay="i * 0.05"
      />
    </div>

  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import CurrencyCard from '@/components/CurrencyCard.vue'
import ratesData from '@/assets/taux.json'

const API_KEY = 'c27fe0e8ccf568a72a903c96'

export default {
  name: 'CompositionView',
  components: { CurrencyCard },
  setup() {
    const xpfAmount  = ref(10000)
    const rates      = ref({})
    const lastUpdate = ref('')

    const currencies = ['AUD','CAD','CHF','EUR','FJD','GBP','JPY','NZD','SGD','THB','USD','VUV']

    const flagMap = {
      AUD: 'au', NZD: 'nz', CAD: 'ca', USD: 'us',
      FJD: 'fj', SGD: 'sg', THB: 'th', CHF: 'ch',
      EUR: 'eu', GBP: 'gb', JPY: 'jp', VUV: 'vu'
    }

    const currencyNames = {
      AUD: 'Dollar Australien',   NZD: 'Dollar Néo-Zélandais',
      CAD: 'Dollar Canadien',     USD: 'Dollar US',
      FJD: 'Dollar Fidjien',      SGD: 'Dollar Singapourien',
      THB: 'Baht Thaïlandais',    CHF: 'Franc Suisse',
      EUR: 'Euro',                GBP: 'Livre Sterling',
      JPY: 'Yen',                 VUV: 'Vatu'
    }

    const currencyNamesEn = {
      AUD: 'Australian Dollar',   NZD: 'New Zealand Dollar',
      CAD: 'Canadian Dollar',     USD: 'US Dollar',
      FJD: 'Fiji Dollar',         SGD: 'Singapore Dollar',
      THB: 'Thai Baht',           CHF: 'Franc Suisse',
      EUR: 'Euro',                GBP: 'Pound Sterling',
      JPY: 'Yen',                 VUV: 'Vatu'
    }

    const convertedRates = computed(() =>
      currencies.map(code => ({
        code,
        amount: rates.value[code]
          ? (xpfAmount.value * rates.value[code]).toLocaleString('fr-FR', { maximumFractionDigits: 2 })
          : '—'
      }))
    )

    const fetchRates = async () => {
      try {
        const res = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/XPF`)
        if (!res.ok) throw new Error('API indisponible')
        const data = await res.json()
        if (data.result !== 'success') throw new Error('Réponse invalide')
        rates.value = data.conversion_rates
      } catch (e) {
        console.warn('Fallback JSON local :', e.message)
        rates.value = ratesData.conversion_rates
      }
      lastUpdate.value = new Date().toLocaleString('fr-FR')
    }

    onMounted(() => {
      fetchRates()
      setInterval(fetchRates, 3600000)
    })

    return { xpfAmount, lastUpdate, convertedRates, currencyNames, currencyNamesEn, flagMap }
  }
}
</script>

<style scoped>
.board {
  min-height: 100vh;
  background: linear-gradient(135deg, #0d2d6b 0%, #1a4a9f 50%, #0d2d6b 100%);
  padding: 2rem;
  font-family: 'Arial', sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;
  color: white;
}

h1 {
  font-size: 2.4rem;
  font-weight: 800;
  letter-spacing: 3px;
  margin: 0 0 4px;
  text-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

.subtitle {
  font-size: 1rem;
  letter-spacing: 4px;
  opacity: 0.75;
  margin: 0 0 1.5rem;
}

.input-wrap {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
}

.input-wrap label {
  font-size: 12px;
  opacity: 0.65;
  margin-bottom: 6px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.input-wrap input {
  font-size: 1.4rem;
  font-weight: 600;
  padding: 8px 24px;
  border-radius: 8px;
  border: 2px solid rgba(255,255,255,0.3);
  background: rgba(255,255,255,0.1);
  color: white;
  text-align: center;
  width: 220px;
  outline: none;
  transition: border 0.2s, background 0.2s;
}

.input-wrap input:focus {
  border-color: rgba(255,255,255,0.7);
  background: rgba(255,255,255,0.15);
}

.update {
  font-size: 11px;
  opacity: 0.4;
  margin-top: 0.8rem;
}

.table-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  max-width: 900px;
  margin: 0 auto;
}

@media (max-width: 600px) {
  h1 { font-size: 1.5rem; letter-spacing: 1px; }
  .table-grid { grid-template-columns: 1fr; }
}
</style>