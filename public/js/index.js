import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
  data() {
    return {
      cur_msg: "",
      active: {
        profile_tab: "images",
        tab: 'chats',
        subtab: 'chat',
      },
      msgs: [
        { type: 'msg', val: "This is Jaiprakash Mishra", ts: 1685970103000, by: '' },
        { type: 'msg', val: "How are you", latitude: '', ts: 1685970103000, by: '' },
        { type: 'maps', latitude: 28.6162944, longitude: 77.053952, ts: 1685970103000,  by: '' },
        { type: 'poll', 
          options: [{val: "Option 1", by: []},
          {val: "Option 2", by: ["vijay", "hulk"]},
          {val: "Option 3", by: ["saurav"]},
          {val: "Option 4", by: ["Mishra"]},], ts: 1685970103000,  by: '' },

        { type: 'sticky', ts: 1685970103000},
        { type: 'maps', latitude: 28.6162944, longitude: 77.053952, ts: 1685970103000,  by: '' },
        { type: 'maps', latitude: 28.6162944, longitude: 77.053952, ts: 1685970103000,  by: '' },
        { type: 'maps', latitude: 28.6162944, longitude: 77.053952, ts: 1685970103000,  by: '' },

        { type: 'maps', latitude: 28.6162944, longitude: 77.053952, ts: 1685970103000,  by: '' },
        { type: 'maps', latitude: 28.6162944, longitude: 77.053952, ts: 1685970103000,  by: '' },

      ],
      dimensions: { width: window.innerWidth, height: window.innerHeight },
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    }

  },
  computed: {
  },
  mounted() {

    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
      window.addEventListener('load', this.setId);
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    sortedArray(list) {
      let x = [...list]
      return x.sort((a,b)=>b.by.length-a.by.length);
    },
    onResize() {
      this.dimensions.width = window.innerWidth;
      this.dimensions.height = window.innerHeight;
    },
    getTime(x) {
      let d = new Date(x);
      let h = d.getHours();

      let hour = h > 12 ? 24 - h : h;
      let mer = h > 12 ? " p.m." : " a.m.";

      let time = hour + ":" + d.getMinutes() + mer;
      return time;

    },
    activeTab(x) {
      if (x == this.active.tab) { return true }
      return false;
    },

    startRecord() {
      navigator.mediaDevices.getUserMedia({ audio: true }).
        then(stream => {
          audioChunks = [];
          rec = new MediaRecorder(stream);
          rec.ondataavailable = e => {
            audioChunks.push(e.data);
            if (rec.state == "inactive") {
              let blob = new Blob(audioChunks, { type: 'audio/mpeg-3' });
              recordedAudio.src = URL.createObjectURL(blob);
              recordedAudio.controls = true;
              sendData(blob);
            }
          };
          rec.start();
          sendBtn.onmouseup = e => { rec.stop() };
        });

    }

  }
}).mount('#app')