<template>
  <div class="header-col">
    <div class="lan-col" @click="transLan">
      {{ $i18n.locale == "en" ? "EN" : "CN" }}
    </div>
    <div class="connect-col" @click="connect">
      {{ account ? str_Address(account) : $i18n.t("connect") }}
    </div>
  </div>
</template>
<script>
import { getProvider, autoSwitch } from "@/util/contractUtil";
export default {
  data() {
    return {
      account: "",
    };
  },
  async mounted() {
    let that = this;
    if (!window.ethereum) return;

    let provider = getProvider();
    ethereum.on("accountsChanged", () => {
      location.reload();
    });
    ethereum.on("chainChanged", () => {
      location.reload();
    });
    provider.listAccounts().then(async (res) => {
      that.account = res[0];
    });
  },
  methods: {
    async connect() {
      if (!window.ethereum) return;
      await ethereum.enable();
      // location.reload();
    },
    str_Address(address) {
      let str1 = address.slice(0, 4);
      let str2 = address.slice(-4);
      return str1 + "..." + str2;
    },
    transLan() {
      let that = this;
      if (
        !localStorage.getItem("p_lang_locale") ||
        localStorage.getItem("p_lang_locale") == "en"
      ) {
        that.$i18n.locale = "zn";
        that.$store.commit("switchLocale", that.$i18n.locale);
        localStorage.setItem("p_lang_locale", "zn");
      } else {
        that.$i18n.locale = "en";
        that.$store.commit("switchLocale", that.$i18n.locale);
        localStorage.setItem("p_lang_locale", "en");
      }
    },
  },
};
</script>
<style lang="less" scoped>
.header-col {
  display: flex;
  width: 100%;
  position: relative;
  justify-content: flex-end;
  padding: 36px 36px 0;
  .lan-col {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 48px;
    height: 48px;
    border: 1px solid #707070;
    border-radius: 5px;
    font-family: "Han";
    font-size: 18px;
    margin-right: 24px;
  }
  .connect-col {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 144px;
    height: 48px;
    border: 1px solid #707070;
    border-radius: 5px;
    font-family: "Han";
    font-size: 18px;
  }
  .do-col {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    font-family: "HanBold";
    font-weight: 900;
    line-height: 36px;
    font-size: 24px;
  }
}

@media screen and(max-width:800px) {
  .connect-col {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 18vw;
    height: 6vw;
    border: 1px solid #707070;
    border-radius: 3px;
    font-family: "Han";
    font-size: 18px;
  }
}
</style>
