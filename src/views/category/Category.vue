<template>
<div class="wapper">
   <ul class="content">
     <button @click="btnClick">按钮</button>
     <li>nihao1</li>
     <li>nihao2</li>
     <li>nihao3</li>
     <li>nihao4</li>
     <li>nihao5</li>
     <li>nihao6</li>
     <li>nihao7</li>
     <li>nihao8</li>
     <li>nihao9</li>
     <li>nihao10</li>
     <li>nihao11</li>
     <li>nihao12</li>
     <li>nihao13</li>
     <li>nihao14</li>
     <li>nihao15</li>
     <li>nihao16</li>
     <li>nihao17</li>
     <li>nihao18</li>
     <li>nihao19</li>
     <li>nihao20</li>
     <li>nihao21</li>
     <li>nihao22</li>
     <li>nihao23</li>
     <li>nihao24</li>
     <li>nihao25</li>
     <li>nihao26</li>
     <li>nihao27</li>
     <li>nihao28</li>
     <li>nihao29</li>
     <li>nihao30</li>
     <li>nihao31</li>
     <li>nihao32</li>
     <li>nihao33</li>
     <li>nihao34</li>
     <li>nihao35</li>
     <li>nihao36</li>
     <li>nihao37</li>
     <li>nihao38</li>
     <li>nihao39</li>
     <li>nihao40</li>
     <li>nihao41</li>
     <li>nihao42</li>
     <li>nihao43</li>
     <li>nihao44</li>
     <li>nihao45</li>
     <li>nihao46</li>
     <li>nihao47</li>
     <li>nihao48</li>
     <li>nihao49</li>
     <li>nihao50</li>
     <li>nihao51</li>
     <li>nihao52</li>
     <li>nihao53</li>
     <li>nihao54</li>
     <li>nihao55</li>
     <li>nihao56</li>
     <li>nihao57</li>
     <li>nihao58</li>
     <li>nihao59</li>
     <li>nihao60</li>
     <li>nihao61</li>
     <li>nihao62</li>
     <li>nihao63</li>
     <li>nihao64</li>
     <li>nihao65</li>
     <li>nihao66</li>
     <li>nihao67</li>
     <li>nihao68</li>
     <li>nihao69</li>
     <li>nihao70</li>
     <li>nihao71</li>
     <li>nihao72</li>
     <li>nihao73</li>
     <li>nihao74</li>
     <li>nihao75</li>
     <li>nihao76</li>
     <li>nihao77</li>
     <li>nihao78</li>
     <li>nihao79</li>
     <li>nihao80</li>
     <li>nihao81</li>
     <li>nihao82</li>
     <li>nihao83</li>
     <li>nihao84</li>
     <li>nihao85</li>
     <li>nihao86</li>
     <li>nihao87</li>
     <li>nihao88</li>
     <li>nihao89</li>
     <li>nihao90</li>
     <li>nihao91</li>
     <li>nihao92</li>
     <li>nihao93</li>
     <li>nihao94</li>
     <li>nihao95</li>
     <li>nihao96</li>
     <li>nihao97</li>
     <li>nihao98</li>
     <li>nihao99</li>
     <li>nihao100</li>
   </ul>
</div>

</template>

<script>
 import BScroll from 'better-scroll'
  export default {
    name: "Category",
    data () {
      return {
        scroll: null
      }
    },
  
    mounted () {
      this.scroll = new BScroll('.wapper',{
           probeType: 3,
           pullUpLoad: true,
           click: false
       })
      //  this.scroll.on('scroll',(prosition) =>{
      //    console.log(prosition);
         
      //  })
       this.scroll.on('pullingUp',() =>{
         console.log('111111111111');
        this.scroll.finishPullUp()
       })
    }, 
    methods: {
      btnClick() {
        console.log("点击");
        
      }
    }
    
  }
</script>

<style scoped>
  .wapper {
    height: 150px;
    background-color: red;
    /* overflow-y: scroll; */
  }
</style>
