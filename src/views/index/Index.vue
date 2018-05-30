<template>
  <div>
    <Row>
      <Col :lg="8" :md="24">
      <Card>
        <div class="intro-div">
          <Row type="flex" align="middle" :gutter="5">
            <Col span="8">
            <img class="intro-avatar" v-if="user" :src="user.avatar" alt="user avatar">
            </Col>
            <Col span="16">
            <div v-if="user" class="intro-desc">
              <b>
                {{user.username}}
              </b>
              <p>
                {{userType}}
              </p>
            </div>
            </Col>
          </Row>
        </div>
        <div class="line-split"></div>
      </Card>
      </Col>
      <Col :lg="16" :md="24">
      <Row :gutter="5">
        <Col :xs="24" :sm="12" :md="6">
        <info-card desc="题目总数" icon-type="document" icon-size="40" :count="problemCount" background="#2d8cf0"></info-card>
        </Col>
        <Col :xs="24" :sm="12" :md="6">
        <info-card desc="用户总数" icon-type="person-stalker" icon-size="40" :count="userCount" background="#ed3f14"></info-card>
        </Col>
        <Col :xs="24" :sm="12" :md="6">
        <info-card desc="比赛总数" icon-type="compass" icon-size="40" :count="contestCount" background="#19be6b"></info-card>
        </Col>
        <Col :xs="24" :sm="12" :md="6">
        <info-card desc="公告总数" icon-type="speakerphone" icon-size="40" :count="bulletinCount" background="#ff9900"></info-card>
        </Col>
      </Row>
      <Row :gutter="5">
        <Col :xs="24" :sm="12">
        <info-card desc="今日评判总数" icon-type="upload" icon-size="40" :count="todaySubmissionCount" background="#2d8cf0"></info-card>
        </Col>
        <Col :xs="24" :sm="12">
        <info-card desc="裁判端总数" icon-type="social-tux" icon-size="40" :count="jdugers" background="#19be6b"></info-card>
        </Col>
      </Row>
      </Col>
    </Row>
    <Row>
      <Col :xs="24" :md="12" v-for="(judgerInfo, index) in judgerInfos" :key="index">
      <judger-info :judger-info="judgerInfo"></judger-info>
      </Col>
    </Row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import problemApi from '@/apis/problem'
import contestApi from '@/apis/contest'
import userApi from '@/apis/user'
import bulletinApi from '@/apis/bulletin'
import judgerApi from '@/apis/judger'
import submissionApi from '@/apis/submission'

const types = {
  admin: '管理员',
  teacher: '教师'
}

export default {
  data() {
    return {
      problemCount: 0,
      contestCount: 0,
      bulletinCount: 0,
      userCount: 0,
      todaySubmissionCount: 0,
      judgerInfos: []
    }
  },
  activated() {
    this.getProblemCount()
    this.getContestCount()
    this.getUserCount()
    this.getBulletinCount()
    this.setInterval()
  },
  deactivated() {
    clearInterval(this.$options.interval)
  },
  computed: {
    ...mapGetters(['user']),
    userType() {
      return types[this.user.userType]
    },
    jdugers() {
      return this.judgerInfos ? this.judgerInfos.length : 0
    }
  },
  methods: {
    getProblemCount() {
      problemApi.count().then(response => {
        if (response) {
          if (response.status === 200) {
            this.problemCount = response.data
          }
        }
      })
    },
    getContestCount() {
      contestApi.count().then(response => {
        if (response) {
          if (response.status === 200) {
            this.contestCount = response.data
          }
        }
      })
    },
    getUserCount() {
      userApi.count().then(response => {
        if (response) {
          if (response.status === 200) {
            this.userCount = response.data
          }
        }
      })
    },
    getBulletinCount() {
      bulletinApi.count().then(response => {
        if (response) {
          if (response.status === 200) {
            this.bulletinCount = response.data
          }
        }
      })
    },
    getJudgerInfo() {
      judgerApi.getJudgerInfo().then(response => {
        if (response) {
          if (response.status === 200) {
            this.judgerInfos = response.data
          }
        }
      })
    },
    countTodaySubmission() {
      submissionApi.countToday().then(response => {
        if (response) {
          if (response.status === 200) {
            this.todaySubmissionCount = response.data
          }
        }
      })
    },
    setInterval() {
      // set interval
      this.$options.interval = setInterval(() => {
        this.getJudgerInfo()
        this.getUserCount()
        this.countTodaySubmission()
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
.ivu-card {
  margin: 10px;
}

.intro-avatar {
  max-width: 100px;
  width: 80%;
  height: auto;
  display: block;
}

.intro-desc {
  b {
    font-size: 3em;
    font-weight: bolder;
    color: #19be6b;
  }
}

.info-card-div {
  height: 100px;
}

.content {
  display: flex;
  justify-content: center;
}
</style>
