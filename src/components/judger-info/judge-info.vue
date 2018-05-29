<template>
  <Card>
    <h2 slot="title">
      <Icon type="social-tux"></Icon>
      {{name}}
    </h2>
    <p slot="extra">
      {{processors}} core(s)
    </p>
    <Row>
      <Col :span="12">
      <ul class="judger-desc center">
        <li>
          <b>
            <Tag type="dot" color="blue">java版本: {{javaVersion}}</Tag>
          </b>
        </li>
        <li>
          <b>
            <Tag type="dot" color="blue">内核版本: {{kernelVersion}}</Tag>
          </b>
        </li>
        <li>
          <b>
            <Tag type="dot" color="blue">本地地址: {{localAddress}}</Tag>
          </b>
        </li>
      </ul>
      </Col>
      <Col :span="12">
      <div class="judged-quantity-div">
        <span class="quantity">
          {{judgedQuantity}}
        </span>
        <p class="description">
          已评判总数
        </p>
      </div>
      </Col>
    </Row>
    <div class="line-split"></div>
    <Row>
      <chart :options="option" :autoResize="true"></chart>
    </Row>
  </Card>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'

export default {
  components: {
    chart: ECharts
  },
  props: {
    judgerInfo: {
      type: Array,
      required: true
    }
  },
  computed: {
    uptimes() {
      return this.judgerInfo.map(item => item.uptime)
    },
    judgeStatus() {
      return this.judgerInfo.map(item => (item.judging ? 1 : 0))
    },
    // judgeStatus() {
    //   return this.judgerInfo.map(item => {
    //     return [item.uptime, item.judging ? 1 : 0]
    //   })
    // },
    name() {
      const name = this.judgerInfo ? this.judgerInfo[0].name : 'unknown'
      return this.judgerInfo ? name.substr(0, name.length - 26) : name
    },
    processors() {
      return this.judgerInfo ? this.judgerInfo[0].availableProcessors : 0
    },
    javaVersion() {
      return this.judgerInfo ? this.judgerInfo[0].javaVersion : 'unknown'
    },
    kernelVersion() {
      return this.judgerInfo ? this.judgerInfo[0].kernelVersion : 'unknown'
    },
    localAddress() {
      return this.judgerInfo ? this.judgerInfo[0].localAddress : 'unknown'
    },
    judgedQuantity() {
      return this.judgerInfo
        ? this.judgerInfo[this.judgerInfo.length - 1].judgedQuantity
        : 0
    },
    option() {
      return {
        title: {
          text: '评判状态',
          left: 'center'
        },
        xAxis: {
          name: '启动时间(ms)',
          type: 'category',
          scale: true,
          data: this.uptimes
        },
        yAxis: {
          name: '评判状态',
          type: 'category',
          axisLabel: {
            formatter(value, index) {
              return value === '1' ? '正在评判' : '未在评判'
            },
            textStyle: {
              color: function(value, index) {
                return value === '1' ? 'green' : 'red'
              }
            }
          },
          minInterval: 1,
          splitNumber: 1,
          data: ['0', '1'],
          min: 0,
          max: 1
        },
        grid: {
          right: '20%'
        },
        series: [
          {
            data: this.judgeStatus,
            type: 'line',
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#19be6b'
                }
              }
            }
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  min-width: 200px;
  height: 200px;
  margin-top: 10px;
}

.judger-desc {
  font-size: 1rem;
  text-align: left;
}

.judged-quantity-div {
  text-align: center;
}

.quantity {
  font-size: 30px;
  font-weight: 700;
  display: inline-block;
  color: #19be6b;
}

.description {
  font-size: 12px;
  font-weight: 500;
  color: #c8c8c8;
}
</style>
