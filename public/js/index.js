import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
  data() {
    return {
      tab: 'profile',
      subtab: 'chat',
      cur_msg: "",
      active: {profile_tab: "images", },
      msg: { val: "This is Jaiprakash Mishra", ts: 1685970103000 },
      dimensions: { width: window.innerWidth, height: window.innerHeight },
      stamp: 'WednesDay',
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      audioChunks: [],
    }

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
      if (x == this.tab) { return true }
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