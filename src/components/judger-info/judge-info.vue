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
      <span>
        评判总数：
      </span>
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
  data() {
    return {
      judgerInfo: [
        {
          name: 'judger-192.168.43.149-a7a6ad8de8484e3a99bfdf26ab2e7d96',
          javaVersion: '1.8.0_162',
          kernelVersion: 'Linux 4.16.9-200.fc27.x86_64 x86_64',
          localAddress: '192.168.43.149',
          uptime: 743071,
          availableProcessors: 8,
          judging: true,
          judgedQuantity: 0
        },
        {
          name: 'judger-192.168.43.149-a7a6ad8de8484e3a99bfdf26ab2e7d96',
          javaVersion: '1.8.0_162',
          kernelVersion: 'Linux 4.16.9-200.fc27.x86_64 x86_64',
          localAddress: '192.168.43.149',
          uptime: 744067,
          availableProcessors: 8,
          judging: false,
          judgedQuantity: 0
        },
        {
          name: 'judger-192.168.43.149-a7a6ad8de8484e3a99bfdf26ab2e7d96',
          javaVersion: '1.8.0_162',
          kernelVersion: 'Linux 4.16.9-200.fc27.x86_64 x86_64',
          localAddress: '192.168.43.149',
          uptime: 745067,
          availableProcessors: 8,
          judging: false,
          judgedQuantity: 0
        },
        {
          name: 'judger-192.168.43.149-a7a6ad8de8484e3a99bfdf26ab2e7d96',
          javaVersion: '1.8.0_162',
          kernelVersion: 'Linux 4.16.9-200.fc27.x86_64 x86_64',
          localAddress: '192.168.43.149',
          uptime: 746067,
          availableProcessors: 8,
          judging: false,
          judgedQuantity: 0
        },
        {
          name: 'judger-192.168.43.149-a7a6ad8de8484e3a99bfdf26ab2e7d96',
          javaVersion: '1.8.0_162',
          kernelVersion: 'Linux 4.16.9-200.fc27.x86_64 x86_64',
          localAddress: '192.168.43.149',
          uptime: 747068,
          availableProcessors: 8,
          judging: false,
          judgedQuantity: 0
        },
        {
          name: 'judger-192.168.43.149-a7a6ad8de8484e3a99bfdf26ab2e7d96',
          javaVersion: '1.8.0_162',
          kernelVersion: 'Linux 4.16.9-200.fc27.x86_64 x86_64',
          localAddress: '192.168.43.149',
          uptime: 748067,
          availableProcessors: 8,
          judging: true,
          judgedQuantity: 0
        },
        {
          name: 'judger-192.168.43.149-a7a6ad8de8484e3a99bfdf26ab2e7d96',
          javaVersion: '1.8.0_162',
          kernelVersion: 'Linux 4.16.9-200.fc27.x86_64 x86_64',
          localAddress: '192.168.43.149',
          uptime: 749067,
          availableProcessors: 8,
          judging: false,
          judgedQuantity: 0
        },
        {
          name: 'judger-192.168.43.149-a7a6ad8de8484e3a99bfdf26ab2e7d96',
          javaVersion: '1.8.0_162',
          kernelVersion: 'Linux 4.16.9-200.fc27.x86_64 x86_64',
          localAddress: '192.168.43.149',
          uptime: 750067,
          availableProcessors: 8,
          judging: true,
          judgedQuantity: 0
        },
        {
          name: 'judger-192.168.43.149-a7a6ad8de8484e3a99bfdf26ab2e7d96',
          javaVersion: '1.8.0_162',
          kernelVersion: 'Linux 4.16.9-200.fc27.x86_64 x86_64',
          localAddress: '192.168.43.149',
          uptime: 751067,
          availableProcessors: 8,
          judging: false,
          judgedQuantity: 0
        },
        {
          name: 'judger-192.168.43.149-a7a6ad8de8484e3a99bfdf26ab2e7d96',
          javaVersion: '1.8.0_162',
          kernelVersion: 'Linux 4.16.9-200.fc27.x86_64 x86_64',
          localAddress: '192.168.43.149',
          uptime: 752067,
          availableProcessors: 8,
          judging: false,
          judgedQuantity: 0
        },
        {
          name: 'judger-192.168.43.149-a7a6ad8de8484e3a99bfdf26ab2e7d96',
          javaVersion: '1.8.0_162',
          kernelVersion: 'Linux 4.16.9-200.fc27.x86_64 x86_64',
          localAddress: '192.168.43.149',
          uptime: 753067,
          availableProcessors: 8,
          judging: false,
          judgedQuantity: 0
        },
        {
          name: 'judger-192.168.43.149-a7a6ad8de8484e3a99bfdf26ab2e7d96',
          javaVersion: '1.8.0_162',
          kernelVersion: 'Linux 4.16.9-200.fc27.x86_64 x86_64',
          localAddress: '192.168.43.149',
          uptime: 754070,
          availableProcessors: 8,
          judging: true,
          judgedQuantity: 0
        },
        {
          name: 'judger-192.168.43.149-a7a6ad8de8484e3a99bfdf26ab2e7d96',
          javaVersion: '1.8.0_162',
          kernelVersion: 'Linux 4.16.9-200.fc27.x86_64 x86_64',
          localAddress: '192.168.43.149',
          uptime: 755067,
          availableProcessors: 8,
          judging: true,
          judgedQuantity: 0
        },
        {
          name: 'judger-192.168.43.149-a7a6ad8de8484e3a99bfdf26ab2e7d96',
          javaVersion: '1.8.0_162',
          kernelVersion: 'Linux 4.16.9-200.fc27.x86_64 x86_64',
          localAddress: '192.168.43.149',
          uptime: 756067,
          availableProcessors: 8,
          judging: false,
          judgedQuantity: 0
        },
        {
          name: 'judger-192.168.43.149-a7a6ad8de8484e3a99bfdf26ab2e7d96',
          javaVersion: '1.8.0_162',
          kernelVersion: 'Linux 4.16.9-200.fc27.x86_64 x86_64',
          localAddress: '192.168.43.149',
          uptime: 757067,
          availableProcessors: 8,
          judging: false,
          judgedQuantity: 0
        },
        {
          name: 'judger-192.168.43.149-a7a6ad8de8484e3a99bfdf26ab2e7d96',
          javaVersion: '1.8.0_162',
          kernelVersion: 'Linux 4.16.9-200.fc27.x86_64 x86_64',
          localAddress: '192.168.43.149',
          uptime: 758068,
          availableProcessors: 8,
          judging: false,
          judgedQuantity: 0
        },
        {
          name: 'judger-192.168.43.149-a7a6ad8de8484e3a99bfdf26ab2e7d96',
          javaVersion: '1.8.0_162',
          kernelVersion: 'Linux 4.16.9-200.fc27.x86_64 x86_64',
          localAddress: '192.168.43.149',
          uptime: 759067,
          availableProcessors: 8,
          judging: false,
          judgedQuantity: 0
        },
        {
          name: 'judger-192.168.43.149-a7a6ad8de8484e3a99bfdf26ab2e7d96',
          javaVersion: '1.8.0_162',
          kernelVersion: 'Linux 4.16.9-200.fc27.x86_64 x86_64',
          localAddress: '192.168.43.149',
          uptime: 760068,
          availableProcessors: 8,
          judging: false,
          judgedQuantity: 0
        },
        {
          name: 'judger-192.168.43.149-a7a6ad8de8484e3a99bfdf26ab2e7d96',
          javaVersion: '1.8.0_162',
          kernelVersion: 'Linux 4.16.9-200.fc27.x86_64 x86_64',
          localAddress: '192.168.43.149',
          uptime: 761067,
          availableProcessors: 8,
          judging: false,
          judgedQuantity: 0
        },
        {
          name: 'judger-192.168.43.149-a7a6ad8de8484e3a99bfdf26ab2e7d96',
          javaVersion: '1.8.0_162',
          kernelVersion: 'Linux 4.16.9-200.fc27.x86_64 x86_64',
          localAddress: '192.168.43.149',
          uptime: 762068,
          availableProcessors: 8,
          judging: false,
          judgedQuantity: 0
        }
      ]
    }
  },
  computed: {
    uptimes() {
      return this.judgerInfo.map(item => item.uptime)
    },
    judgeStatus() {
      return this.judgerInfo.map(item => {
        return [item.uptime, item.judging ? 1 : 0]
      })
    },
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
        ? this.judgedQuantity[this.judgedQuantity.length - 1].judgedQuantity
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
          type: 'value',
          scale: true
        },
        yAxis: {
          name: '是否正在评判(1:是; 0:否)',
          type: 'category',
          axisLabel: {
            formatter(value, index) {
              return value === '1' ? '正在评判' : '未评判'
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
  min-width: 400px;
  height: 200px;
  margin-top: 10px;
}

.judger-desc {
  font-size: 1rem;
  text-align: left;
}
</style>
