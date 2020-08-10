<template>
    <div>
        <span>Tempo de atendimento</span> <br/>
        <div class="timerText">
            {{hour}}:{{minutes}}:{{seconds}}
        </div>
    </div>
</template>

<script>

export default {

    data(){
        return {
            hourCalc: 0,
            minutesCalc: 0,
            secondsCalc: 0,

            hour:'00',
            minutes:'00',
            seconds: '00',
            
            timer_initialized: null,
            timer_finalized: null,
            interval: null
        }
    },

    methods: {
        initTimer(){
            this.timer_initialized = new Date();

            this.hourCalc = 0;
            this.minutesCalc = 0;
            this.secondsCalc = 0;

            this.hour ='00';
            this.minutes ='00';
            this.seconds = '00';

            this.interval = setInterval(this.tick, 1000);
        }, 

        tick(){
            this.secondsCalc += 1;

            if(this.secondsCalc == 60){
                this.secondsCalc = 0;
                this.minutesCalc += 1;

                this.minutes = this.minutesCalc.toString();
                this.minutes = (this.minutes.length == 1)?'0'+this.minutes:this.minutes;

                if (this.minutesCalc == 60){
                    this.minutesCalc = 0;
                    this.minutes = '00';

                    this.hourCalc+=1;

                    this.hour = this.hourCalc.toString();
                    this.hour = (this.hour.length == 1)? '0' + this.hour:this.hour;
                }
            }
            
            this.seconds = this.secondsCalc.toString();
            this.seconds = (this.seconds.length==1)?'0'+this.seconds:this.seconds;
        },

        stopTimer(){
            this.timer_finalized = new Date();
            clearInterval(this.interval);
        },


        getCurrenteData(){
            return {
                'init': this.timer_initialized,
                'finish': this.timer_finalized,
                'duration': `${this.hour}:${this.minutes}:${this.seconds}`
            }
        }
    }


}

</script>

<style scoped>
    .timerText{
        font-size: 32px;
        font-weight: bold;
        color: #0e66a1;
    }
</style>