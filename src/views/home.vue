<template>
  <div class="wrap">
    <div class="wrap-main">
      <polyHeader></polyHeader>
      <div class="content-col">
        <div class="title-col">{{ $t("title") }}</div>
        <!-- <div class="token-col">
          {{ $t("address") }}:<span class="addr-item">
            <a
              href="javascript:;"
              v-clipboard:success="onCopy"
              v-clipboard:copy="daoAddress"
            >
              {{ daoAddress }}</a
            ></span
          >
        </div> -->

        <div class="t-col" v-if="!countflag">
          <div class="t-item">DAYS</div>
          <div class="t-item">HRS</div>
          <div class="t-item">MINS</div>
          <div class="t-item">SECS</div>
        </div>
        <div class="count-col" v-if="!countflag">
          <div class="day-item child-item">
            <span> {{ day }}</span>
          </div>
          <div class="o-item">:</div>
          <div class="hour-item child-item">
            <span> {{ hour }}</span>
          </div>
          <div class="o-item">:</div>
          <div class="min-item child-item">
            <span> {{ min }}</span>
          </div>
          <div class="o-item">:</div>
          <div class="sec-item child-item">
            <span> {{ sec }}</span>
          </div>
        </div>
        <div class="notice-col" v-if="!countflag">
          {{ $t("notice") }}
        </div>
        <div class="token-col" v-if="daoAddress != ''">
          {{ $t("address") }}:&nbsp;&nbsp;<span class="addr-item">
            <a
              href="javascript:;"
              v-clipboard:success="onCopy"
              v-clipboard:copy="daoAddress"
            >
              {{ daoAddress }}</a
            ></span
          >
          <div
            class="img-item"
            v-clipboard:success="onCopy"
            v-clipboard:copy="daoAddress"
          >
            <img src="../assets/img/copy.png" alt="" />
          </div>
        </div>
        <div class="select-col">
          <div class="select-item">
            <el-select
              v-model="tokenId"
              :placeholder="$t('selectOne')"
              :disabled="disabled"
              :no-data-text="$i18n.t('nodata')"
            >
              <el-option
                v-for="item in tokenIDs"
                :key="item.value"
                :label="$i18n.locale == 'en' ? item.label : item.labelzn"
                :value="item.value"
                :disabled="item.disabled"
              >
              </el-option>
            </el-select>
          </div>
          <div class="warn-col">
            {{ $t("msgOne") }}
          </div>
          <div class="select-item sec">
            <el-select
              v-model="mintKind"
              :placeholder="$t('selectTwo')"
              :disabled="disabled"
              :no-data-text="$i18n.t('nodata')"
            >
              <el-option
                v-for="item in mintKinds"
                :key="item.value"
                :label="$i18n.locale == 'en' ? item.label : item.labelzn"
                :value="item.value"
                :disabled="item.disabled"
              >
              </el-option>
            </el-select>
          </div>
          <div class="warn-col" style="color: orange" v-if="mintKind != ''">
            {{ $t("synthesized") }}:{{ assetInfo["mintedformat"] }} /
            {{ $t("total") }}:{{ assetInfo["totalformat"] }}
          </div>
          <div class="warn-col" v-if="mintKind != ''" style="color: orange">
            {{ $t("selectMsgOne") }}{{ assetInfo["lockTime"]
            }}{{ $t("selectMsgTwo") }}{{ assetInfo["releaseTime"]
            }}{{ $t("selectMsgThree") }}&nbsp;&nbsp;&nbsp;{{ $t("tge") }}:{{
              toPercent(assetInfo["tge"])
            }}
          </div>
          <!-- <div class="input-item">
            <el-input
              v-model="amount"
              :placeholder="$t('input')"
              :disabled="disabled || mintKind == ''"
            ></el-input>
          </div> -->
          <div class="num-item">
            <span>{{ $t("info3") }}:</span>

            <div class="num-col">
              <span
                class="min"
                @click="toMin"
                v-if="!(disabled || mintKind == '')"
                >{{ $t("min") }}</span
              >
              <span
                class="min"
                v-if="disabled || mintKind == ''"
                style="color: rgba(33, 33, 33, 0.5)"
                >{{ $t("min") }}</span
              >
              <el-input-number
                v-model="amount"
                @change="handleChange"
                :min="0.25"
                :max="5"
                :step="0.25"
                label=""
                :disabled="disabled || mintKind == ''"
                :step-strictly="true"
              ></el-input-number>
              <span
                class="max"
                @click="toMax"
                v-if="!(disabled || mintKind == '')"
                >{{ $t("max") }}</span
              >
              <span
                class="max"
                style="color: rgba(33, 33, 33, 0.5)"
                v-if="disabled || mintKind == ''"
                >{{ $t("max") }}</span
              >
            </div>
          </div>
          <div class="radio-item">
            <span class="title">{{ $t("radio") }}:</span>
            <el-radio
              v-model="psc_or_wdc"
              label="2"
              :disabled="disabled || mintKind == ''"
              >PSC</el-radio
            >
            <el-radio
              v-model="psc_or_wdc"
              label="1"
              :disabled="disabled || mintKind == ''"
              >PSC&WDC</el-radio
            >
          </div>
          <div class="warn-col warn-col-new">
            {{ $t("msgTwoFirst") }}
            {{ psc }}PSC<span v-if="psc_or_wdc == '1'">
              {{ $t("and") }}{{ wdc }}WDC</span
            >{{ $t("msgTwoSecond") }}
          </div>
        </div>

        <div class="confirm-col" @click="dialogVisible = true" v-if="canMerge">
          {{ $t("confirm") }}
        </div>
        <div class="confirm-col gray" v-if="!canMerge">{{ $t("confirm") }}</div>
      </div>
    </div>
    <el-dialog title="" :visible.sync="dialogVisible" :width="dialogWidth">
      <div class="content">
        <div class="info-col">{{ $t("info1") }}: #{{ tokenId }}</div>
        <div class="info-col">
          {{ $t("info2") }}:
          {{ map.get(mintKind) }}
        </div>
        <div class="info-col">{{ $t("info3") }}: {{ amount }}</div>
        <div class="info-col">{{ $t("consume") }}WDC: {{ wdc }}</div>
        <div class="info-col">{{ $t("consume") }}PSC: {{ psc }}</div>
      </div>
      <div class="btn-col" @click="mix">{{ $t("confirm") }}</div>
    </el-dialog>
    <loading v-if="showLoading"></loading>
  </div>
</template>

<script>
import { autoSwitch, getProvider, getContract } from "@/util/contractUtil";
import loading from "@/components/loading.vue";
import { get_user_data } from "@/API/api";
import abi from "@/contract/ploydao.json";
import prcabi from "@/contract/prc20.json";
import { ethers } from "ethers";
import polyHeader from "@/components/header.vue";
export default {
  data() {
    return {
      countflag: false,
      num: 0.25,
      daoAddress: "",
      showLoading: false,
      value: "",
      mintKinds: [],
      mintKind: "",
      contract: {},
      kindArr: [],
      tokenIDs: [],
      kind0: 0,
      kind1: 0,
      kind2: 0,
      unitPscPrice: 0,
      unitOnePscPrice: 0,
      unitOneWdcPrice: 0,
      tokenId: "",
      psc_or_wdc: "2",
      amount: "",
      account: "",
      canMerge: false,
      disabled: true,
      psc: "0",
      wdc: "0",
      dialogVisible: false,
      dialogWidth: "30%",
      assetInfo: [],
      timer: {},
      link: "",
      map: new Map([
        [1, "A"],
        [2, "B"],
        [3, "C"],
        [5, "D"],
        [6, "E"],
        [7, "F"],
        [8, "G"],
        [9, "H"],
        [10, "I"],
        [11, "J"],
        [12, "K"],
        [13, "L"],
        [14, "M"],
        [15, "N"],
        [16, "O"],
        [17, "P"],
        [18, "Q"],
        [19, "R"],
        [20, "S"],
      ]),
      // curStartTime: "2022/5/25 14:00:00",
      curStartTime: 1653458400000,
      day: "00",
      hour: "00",
      min: "00",
      sec: "00",
    };
  },
  created() {
    this.setDialogWidth();
  },

  async mounted() {
    let that = this;
    await that.countTime();
    that.seeLocationData();
    if (!window.ethereum) return;
    await autoSwitch();
    let provider = getProvider();
    that.contract = getContract(process.env.VUE_APP_POLYADDRESS, abi);

    provider.listAccounts().then(async (res) => {
      that.account = res[0];
      if (res.length > 0) {
        that.getDaoAddress();
        that.seeAmount();
        that.seeDisabled();
        that.getPrice();
        await that.getUserData(res[0]);
        // that.disabled = false;
      }
    });
  },
  destroyed() {
    let that = this;
    clearInterval(that.timer);
  },
  components: {
    loading,
    polyHeader,
  },
  methods: {
    toMin() {
      let that = this;
      that.amount = 0.25;
    },
    toMax() {
      let that = this;
      that.amount = 5;
    },
    handleChange(value) {
      // console.log(value);
    },
    onCopy() {
      let that = this;
      return that.$message({
        message: that.$i18n.t("copy"),
        type: "success",
        message_obj: {},
        isLink: false,
      });
    },
    async getDaoAddress() {
      let that = this;
      that.daoAddress = await that.contract.polyDaoAddr();
      that.link = process.env.VUE_APP_PSC + "" + that.daoAddress;
    },
    async mix() {
      let that = this;

      let wdcPrice = 0;
      let pscPrice = 0;
      let mintMultiple = (Number(that.amount) * 4).toString();
      if (that.psc_or_wdc == "1") {
        wdcPrice = that.unitOneWdcPrice.mul(
          ethers.BigNumber.from(mintMultiple)
        );
        pscPrice = that.unitOnePscPrice.mul(
          ethers.BigNumber.from(mintMultiple)
        );
        let approved = await that.prcApprove();
        if (approved == -1) return;
      } else {
        wdcPrice = 0;
        pscPrice = that.unitPscPrice.mul(ethers.BigNumber.from(mintMultiple));
      }
      that.showLoading = true;
      let errStr = "";
      let result = await that.contract
        .mix(
          that.tokenId,
          wdcPrice,
          pscPrice.toString(),
          mintMultiple,
          that.mintKind,
          {
            value: pscPrice,
          }
        )
        .catch((e) => {
          try {
            if (e.code != 4001 && e != "cancel") {
              let str = e.data.error.message;
              if (str.indexOf(":") != -1) {
                errStr = that.$i18n.t("fail") + str.slice(str.indexOf(":"));
              } else {
                errStr = that.$i18n.t("fail");
              }
            } else {
              errStr = that.$i18n.t("fail");
            }
            return -1;
          } catch (error) {
            that.showLoading = false;
            return that.$message({
              message: that.$i18n.t("fail"),
              type: "error",
              message_obj: {},
              isLink: false,
            });
          }
        });

      if (result == -1) {
        that.showLoading = false;
        return that.$message({
          message: errStr,
          type: "error",
          message_obj: {},
          isLink: false,
        });
      }
      that.set_location_data(result.hash, "Synthetic", "合成");
      await result.wait();
      // that.showLoading = false;
      // that.$message({
      //   message: that.$i18n.t("success"),
      //   type: "success",
      //   message_obj: {},
      //   isLink: false,
      // });
      setTimeout(() => {
        location.reload();
      }, 2000);
    },
    async seeAmount() {
      let that = this;

      for (let i = 1; i < 21; i++) {
        let amount = await that.contract.kindAmount(i);
        let minted = await that.contract.totalMintAmount(i);
        let amountformat = that.amountFormat(amount);
        let mintedformat = that.amountFormat(minted);
        let totalformat =
          Number(that.amountFormat(amount)) + Number(that.amountFormat(minted));
        let obj = {
          value: i,
          label: "Type " + that.map.get(i),
          labelzn: "合成類型" + that.map.get(i),
          amount: amount,
          disabled: amount.gt(ethers.BigNumber.from("0")) ? false : true,
          // label: "Type " + that.map.get(i) + " (balance:" + amountformat + ")",
          // labelzn:
      

          amountformat: amountformat,
          mintedformat: mintedformat,
          totalformat: totalformat,
        };
        // console.log(mintedformat);
        if (mintedformat > 0 || obj.amount.gt(ethers.BigNumber.from("0")))
          that.mintKinds.push(obj);
        // console.log(that.mintKinds);
      }
      // let kind0 = await that.contract.kindAmount(0);
      // let kind1 = await that.contract.kindAmount(1);
      // let kind2 = await that.contract.kindAmount(2);
      // that.kind0 = that.amountFormat(kind0);
      // that.kind1 = that.amountFormat(kind1);
      // that.kind2 = that.amountFormat(kind2);
    },
    async getUserData(account) {
      let that = this;
      let chainId = await ethereum.request({
        method: "eth_chainId",
      });

      if (chainId != `0x${Number(process.env.VUE_APP_CHAINID).toString(16)}`)
        return;
      let res = await get_user_data(account, 1, 10000);
      res.data.avatars.forEach(async (item) => {
        let use = await that.valid(item.tokenId);
        let obj = {
          value: item.tokenId,
          label: `# ${item.tokenId} ${use == "true" ? "" : "Used"}`,
          labelzn: `# ${item.tokenId} ${use == "true" ? "" : "已使用"}`,
          disabled: use == "true" ? false : true,
        };

        that.tokenIDs.push(obj);
      });
    },
    amountFormat(v) {
      return Number(v.toString()) / 4;
    },
    async getPrice() {
      let that = this;
      if (that.mintKind == "") return;

      let priceArr = await that.contract.kindUnitPscPriceInfo(that.mintKind);
      that.unitPscPrice = priceArr[0];
      that.unitOnePscPrice = priceArr[1];
      that.unitOneWdcPrice = priceArr[2];
    },

    async valid(tokenId) {
      if (!tokenId) return;
      let that = this;
      let res = await that.contract.isJetAddrValid(tokenId);

      return res.toString();
    },
    async prcApprove() {
      let that = this;
      let contract = await getContract(
        process.env.VUE_APP_WDCADDRESS,
        prcabi.abi
      );
      let res = await contract.allowance(
        that.account,
        process.env.VUE_APP_POLYADDRESS
      );

      if (res.lt(ethers.BigNumber.from("2").pow(254))) {
        that.showLoading = true;
        let appro = await contract
          .approve(
            process.env.VUE_APP_POLYADDRESS,
            ethers.BigNumber.from("2").pow(255)
          )
          .catch((err) => {
            return -1;
          });
        if (appro == -1) {
          // return -1;
          that.showLoading = false;
          that.$message({
            message: that.$i18n.t("failapprove"),
            type: "error",
            message_obj: {},
            isLink: false,
          });
          return -1;
        }
        that.set_location_data(appro.hash, "Approve", "批准");
        await appro.wait();
        // that.$message({
        //   message: that.$i18n.t("successapprove"),
        //   type: "success",
        //   message_obj: {},
        //   isLink: false,
        // });
      }
    },
    checkAmount() {
      let that = this;
      if (isNaN(that.amount)) {
        that.amount = "";
        return;
      }
      if (that.amount > 5) {
        that.amount = "";
        return;
      }
      if (
        Number(that.amount) != 0 &&
        Number(that.amount) != 0.2 &&
        that.amount < 0.25
      ) {
        that.amount = "";
        return;
      }
    },
    async checkPscOrWdc() {
      let that = this;
      let wdcPrice = 0;
      let pscPrice = 0;
      if (
        that.unitOneWdcPrice == 0 ||
        that.unitOnePscPrice == 0 ||
        that.unitPscPrice == 0
      )
        return;
      if (isNaN(that.amount)) return;
      let mintMultiple = (Number(that.amount) * 4).toString();
      if (parseInt(mintMultiple) != mintMultiple) return;
      if (that.psc_or_wdc == "1") {
        wdcPrice = that.unitOneWdcPrice.mul(
          ethers.BigNumber.from(mintMultiple)
        );
        pscPrice = that.unitOnePscPrice.mul(
          ethers.BigNumber.from(mintMultiple)
        );
      } else {
        wdcPrice = 0;
        pscPrice = that.unitPscPrice.mul(ethers.BigNumber.from(mintMultiple));
      }

      that.psc = ethers.utils.commify(
        that.removeZero(ethers.utils.formatUnits(pscPrice, 18))
      );
      that.wdc = ethers.utils.commify(
        that.removeZero(
          ethers.utils.formatUnits(wdcPrice, process.env.VUE_APP_WDC_DECIMAL)
        )
      );
    },
    setDialogWidth() {
      var val = document.body.clientWidth;
      const def = 700; // default width
      const defh = 420; // default height
      if (val < def) {
        this.dialogWidth = "85%";
      } else {
        this.dialogWidth = def + "px";
        this.dialogHeight = defh + "px";
      }
    },
    async seeDisabled() {
      let that = this;
      let res = await that.contract.disabled();
      if (res == true || !that.countflag == true) {
        that.disabled = true;
      } else {
        that.disabled = false;
      }
    },
    async getAssetInfo() {
      let that = this;
      if (that.mintKind == "") return;
      that.assetInfo = await that.contract.kindAssetsInfo(that.mintKind);

      let obj = {
        amountformat: that.mintKinds[that.mintKind - 1].amountformat,
        mintedformat: that.mintKinds[that.mintKind - 1].mintedformat,
        totalformat: that.mintKinds[that.mintKind - 1].totalformat,
      };
      if (that.mintKind == 3) {
        obj.mintedformat = obj.mintedformat - Number(process.env.VUE_APP_C_NUM);
        obj.totalformat = obj.totalformat - Number(process.env.VUE_APP_C_NUM);
      } else if (that.mintKind == 2) {
        obj.mintedformat = obj.mintedformat - Number(process.env.VUE_APP_B_NUM);
        obj.totalformat = obj.totalformat - Number(process.env.VUE_APP_B_NUM);
      } else if (that.mintKind == 1) {
        obj.mintedformat = obj.mintedformat - Number(process.env.VUE_APP_A_NUM);
        obj.totalformat = obj.totalformat - Number(process.env.VUE_APP_A_NUM);
      }

      that.assetInfo = { ...that.assetInfo, ...obj };
      console.log(that.mintKind);
      console.log(that.assetInfo);
    },
    countTime() {
      let that = this;
      let date = new Date();
      let now = date.getTime();
      let endDate = new Date(that.curStartTime);
      let end = endDate.getTime();
      let leftTime = end - now;
      if (leftTime > 0) {
        let day = Math.floor(leftTime / 1000 / 60 / 60 / 24);
        that.day = day < 10 ? "0" + day : day;

        let h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
        that.hour = h < 10 ? "0" + h : h;

        let m = Math.floor((leftTime / 1000 / 60) % 60);
        that.min = m < 10 ? "0" + m : m;
        let s = Math.floor((leftTime / 1000) % 60);
        that.sec = s < 10 ? "0" + s : s;
      } else {
        that.day = 0;
        that.hour = "00";
        that.min = "00";
        that.sec = "00";
      }
      if (
        Number(that.hour) === 0 &&
        Number(that.day) === 0 &&
        Number(that.min) === 0 &&
        Number(that.sec) === 0
      ) {
        that.countflag = true;
        return;
      } else {
        setTimeout(that.countTime, 1000);
      }
    },
    removeZero(v) {
      if (v == "" || Number(v) < 1) return v;
      return Number(v).toFixed(4);
    },
    toPercent(v) {
      if (!v) return;
      return Number(v.toString()) / 100 + "%";
    },
    set_location_data(hash, method, methodcn) {
      var txArr = JSON.parse(localStorage.getItem("txArr"));
      if (!txArr) {
        txArr = [];
      }
      let obj = {
        method: method,
        methodcn: methodcn,
        hash: hash,
      };
      txArr.push(obj);
      localStorage.setItem("txArr", JSON.stringify(txArr));
    },

    async seeLocationData() {
      let that = this;
      let provider = getProvider();
      that.timer = setInterval(async () => {
        let txArr = JSON.parse(localStorage.getItem("txArr"));
        if (txArr) {
          for (let i = txArr.length - 1; i >= 0; i--) {
            let result = await provider
              .getTransaction(txArr[i].hash)
              .then((res) => {
                return res;
              })
              .catch((err) => {
                return "";
              });
            if (result !== "" && result !== null && result.blockNumber > 0) {
              let massagestr;

              that.$i18n.locale == "en"
                ? (massagestr =
                    txArr[i].method +
                    " Successful, please refresh the page later to view")
                : (massagestr = txArr[i].methodcn + "成功，請稍後刷新頁面查看");
              that.$message({
                message: massagestr,
                type: "success",
                message_obj: {},
                duration: 5000,
              });
              that.showLoading = false;
              txArr.splice(i, 1);
            }
          }
          localStorage.setItem("txArr", JSON.stringify(txArr));
        }
      }, 1500);
    },
  },
  watch: {
    countflag() {
      let that = this;
      if (that.countflag) {
        that.disabled = false;
      }
    },
    amount() {
      let that = this;
      if (
        that.mintKind != "" &&
        Number(that.amount) % 0.25 == 0 &&
        Number(that.amount) != 0 &&
        that.tokenId != "" &&
        that.amount != ""
      ) {
        that.canMerge = true;
      } else {
        that.canMerge = false;
      }

      that.checkAmount();
      that.checkPscOrWdc();
    },
    psc_or_wdc() {
      let that = this;
      that.checkPscOrWdc();
    },
    async mintKind() {
      let that = this;
      if (
        that.mintKind != "" &&
        Number(that.amount) % 0.25 == 0 &&
        Number(that.amount) != 0 &&
        that.tokenId != "" &&
        that.amount != ""
      ) {
        that.canMerge = true;
      } else {
        that.canMerge = false;
      }
      await that.getPrice();
      that.checkPscOrWdc();
      that.getAssetInfo();
    },
    tokenId() {
      let that = this;
      if (
        that.mintKind != "" &&
        Number(that.amount) % 0.25 == 0 &&
        Number(that.amount) != 0 &&
        that.tokenId != "" &&
        that.amount != ""
      ) {
        that.canMerge = true;
      } else {
        that.canMerge = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../assets/css/home.less");
</style>
<style>
.el-select .el-input .el-select__caret {
  color: #000 !important;
  font-weight: 900;
}
.el-input__suffix {
  margin-right: 16px;
}
</style>
