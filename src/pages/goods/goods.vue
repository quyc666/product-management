<template>
    <div class="goods-container">
        <!-- 搜索和筛选区域 -->
        <div>
            <el-form :model="queryParams" ref="queryForm" :inline="true">
                <el-form-item label="关键词搜索：">
                    <el-input v-model="queryParams.keyword" placeholder="商品名称" clearable />
                </el-form-item>
                <el-form-item label="商品分类：">
                    <el-select v-model="queryParams.category" style="width: 150px">
                        <el-option
                            v-for="item in categories"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="商品状态：">
                    <el-select v-model="queryParams.status" style="width: 150px">
                        <el-option
                            v-for="item in statusOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleQuery">查询</el-button>
                    <el-button @click="resetQuery">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!-- 操作按钮区域 -->
        <div class="operation-container">
            <el-button type="primary" @click="handleAdd">新增</el-button>
            <el-button type="danger" :disabled="!selectedRows.length" @click="handleBatchDelete">批量删除</el-button>
            <el-button type="success" :disabled="!selectedRows.length" @click="handleBatchPublish">批量上架</el-button>
            <el-button :disabled="!selectedRows.length" @click="handleBatchUnpublish">批量下架</el-button>
        </div>

        <!-- 表格区域 -->
        <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" v-loading="loading"
            header-align="center" ref="tableRef">
            <el-table-column type="selection" width="55" />
            <el-table-column label="商品信息" min-width="300" header-align="center" align="left">
                <template #default="scope">
                    <div class="goods-info">
                        <el-image :src="scope.row.image" :preview-src-list="[scope.row.image]" fit="cover"
                            class="goods-image" />
                        <div class="goods-detail">
                            <div class="goods-name">{{ scope.row.name }}</div>
                            <div class="goods-price">¥{{ scope.row.price }}</div>
                            <div class="goods-category">分类：{{ scope.row.categoryName }}</div>
                            <div class="goods-time">创建时间：{{ scope.row.createTime }}</div>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="sales" label="实际销量" width="100" align="center" />
            <el-table-column label="商品状态" width="100" align="center">
                <template #default="scope">
                    <el-tag :type="scope.row.status === '1' ? 'success' : 'info'">
                        {{ scope.row.status === '1' ? '上架' : '下架' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="审核状态" width="100" align="center">
                <template #default="scope">
                    <el-tag :type="getAuditStatusType(scope.row.auditStatus)">
                        {{ getAuditStatusText(scope.row.auditStatus) }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="stock" label="总库存" width="100" align="center" />
            <el-table-column label="操作" width="420" fixed="right" align="center">
                <template #default="scope">
                    <div class="operation-buttons">
                        <el-button link type="primary" @click="handleEdit(scope.row)">修改</el-button>
                        <el-button link type="primary" @click="handleSpecification(scope.row)">商品规格</el-button>
                        <el-button link type="primary" @click="handleCarousel(scope.row)">设置轮播图</el-button>
                        <el-button link type="primary" @click="handleDetail(scope.row)">商品详情</el-button>
                        <el-button link type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页区域 -->
        <div class="pagination-container">
            <el-pagination v-model:current-page="queryParams.pageNum" v-model:page-size="queryParams.pageSize"
                :page-sizes="[10, 20]" :total="total" layout="total, sizes, prev, pager, next"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/dist/index.css'

// 筛选条件
const isFilterCollapse = ref(false)
const queryParams = reactive({
    keyword: '',
    category: 'all',
    status: 'all',
    pageNum: 1,
    pageSize: 10
})

// 表格数据
const loading = ref(false)
const total = ref(30)
const selectedRows = ref([])
const tableData = ref([])
const allData = ref([]) // 存储所有数据

// 表格ref
const tableRef = ref(null)

// 分类选项
const categories = [
    { value: 'all', label: '全部' },
    { value: '1', label: '手机数码' },
    { value: '2', label: '服装服饰' },
    { value: '3', label: '家用电器' },
    { value: '4', label: '食品生鲜' }
]

// 状态选项
const statusOptions = [
    { value: 'all', label: '全部' },
    { value: '1', label: '上架' },
    { value: '0', label: '下架' }
]

// 获取审核状态样式
const getAuditStatusType = (status) => {
    const map = {
        1: 'success',
        2: 'danger',
        3: 'warning'
    }
    return map[status]
}

// 获取审核状态文本
const getAuditStatusText = (status) => {
    const map = {
        1: '通过',
        2: '拒绝',
        3: '审核中'
    }
    return map[status]
}

// 初始化时生成30条数据
const initTableData = () => {
    const baseProducts = [
        { name: 'iPhone 15', category: '手机数码', price: 6999 },
        { name: 'MacBook Air', category: '手机数码', price: 7999 },
        { name: '华为平板', category: '手机数码', price: 3999 },
        { name: '运动长裤', category: '服装服饰', price: 299 },
        { name: '休闲夹克', category: '服装服饰', price: 499 },
        { name: '智能电视', category: '家用电器', price: 2999 },
        { name: '洗衣机', category: '家用电器', price: 1999 },
        { name: '有机蔬菜', category: '食品生鲜', price: 99 },
        { name: '进口水果', category: '食品生鲜', price: 199 },
        { name: '海鲜套餐', category: '食品生鲜', price: 299 }
    ]

    const newData = []
    for (let i = 0; i < 30; i++) {
        const baseProduct = baseProducts[i % baseProducts.length]
        newData.push({
            id: i + 1,
            name: `${baseProduct.name} ${Math.floor(i / baseProducts.length) + 1}`,
            image: 'https://placeholder.co/100x100',
            price: baseProduct.price,
            categoryName: baseProduct.category,
            createTime: '2024-12-30 12:00:00',
            sales: 0,
            status: '0', // 默认下架
            auditStatus: 1,
            stock: Math.floor(Math.random() * 1000) + 100
        })
    }
    allData.value = newData
    updateTableData()
}

// 更新表格数据（处理分页）
const updateTableData = () => {
    loading.value = true
    const start = (queryParams.pageNum - 1) * queryParams.pageSize
    const end = start + queryParams.pageSize
    
    // 过滤数据
    let filteredData = allData.value

    // 根据搜索条件过滤
    if (queryParams.keyword) {
        filteredData = filteredData.filter(item => 
            item.name.toLowerCase().includes(queryParams.keyword.toLowerCase())
        )
    }

    // 根据分类过滤
    if (queryParams.category && queryParams.category !== 'all') {
        filteredData = filteredData.filter(item => 
            item.categoryName === categories.find(c => c.value === queryParams.category)?.label
        )
    }

    // 根据状态过滤
    if (queryParams.status && queryParams.status !== 'all') {
        filteredData = filteredData.filter(item => item.status === queryParams.status)
    }

    // 更新总数
    total.value = filteredData.length

    // 分页处理
    tableData.value = filteredData.slice(start, end)

    setTimeout(() => {
        loading.value = false
    }, 300)
}

// 查询
const handleQuery = () => {
    queryParams.pageNum = 1
    updateTableData()
}

// 重置
const resetQuery = () => {
    queryParams.keyword = ''
    queryParams.category = 'all'
    queryParams.status = 'all'
    queryParams.pageNum = 1
    updateTableData()
}

// 处理页码改变
const handleCurrentChange = (val) => {
    queryParams.pageNum = val
    updateTableData()
}

// 处理每页条数改变
const handleSizeChange = (val) => {
    queryParams.pageSize = val
    queryParams.pageNum = 1
    updateTableData()
}

// CRUD操作
const handleAdd = () => {
    ElMessage.info('点击了新增按钮')
}

const handleEdit = (row) => {
    ElMessage.info(`点击了修改按钮，商品ID：${row.id}`)
}

const handleDelete = (row) => {
    ElMessageBox.confirm('确认要删除该商品吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        const index = allData.value.findIndex(item => item.id === row.id)
        if (index !== -1) {
            allData.value.splice(index, 1)
            updateTableData()
            ElMessage.success('删除成功')
        }
    }).catch(() => {
        // 取消删除
    })
}

const handleBatchDelete = () => {
    if (selectedRows.value.length === 0) return
    ElMessageBox.confirm(`确认要删除选中的 ${selectedRows.value.length} 个商品吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        const selectedIds = selectedRows.value.map(row => row.id)
        allData.value = allData.value.filter(item => !selectedIds.includes(item.id))
        selectedRows.value = []
        tableRef.value.clearSelection()
        updateTableData()
        ElMessage.success('批量删除成功')
    }).catch(() => {
        // 取消删除
    })
}

const handleSpecification = (row) => {
    ElMessage.info(`点击了商品规格按钮，商品ID：${row.id}`)
}

const handleCarousel = (row) => {
    ElMessage.info(`点击了设置轮播图按钮，商品ID：${row.id}`)
}

const handleDetail = (row) => {
    ElMessage.info(`点击了商品详情按钮，商品ID：${row.id}`)
}

const handleSelectionChange = (rows) => {
    selectedRows.value = rows
}

const handleBatchPublish = () => {
    if (selectedRows.value.length === 0) return
    
    // 更新选中商品的状态
    selectedRows.value.forEach(row => {
        const index = allData.value.findIndex(item => item.id === row.id)
        if (index !== -1) {
            allData.value[index].status = '1'
        }
    })
    
    updateTableData()
    ElMessage.success(`已将选中的 ${selectedRows.value.length} 个商品上架`)
    // 清空选择
    selectedRows.value = []
    // 清空表格的选择状态
    tableRef.value.clearSelection()
}

const handleBatchUnpublish = () => {
    if (selectedRows.value.length === 0) return
    
    // 更新选中商品的状态
    selectedRows.value.forEach(row => {
        const index = allData.value.findIndex(item => item.id === row.id)
        if (index !== -1) {
            allData.value[index].status = '0'
        }
    })
    
    updateTableData()
    ElMessage.success(`已将选中的 ${selectedRows.value.length} 个商品下架`)
    // 清空选择
    selectedRows.value = []
    // 清空表格的选择状态
    tableRef.value.clearSelection()
}

// 初始化
onMounted(() => {
    initTableData()
})
</script>

<style scoped>
.goods-container {
    padding: 20px;
}

.filter-container {
    margin-bottom: 20px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.operation-container {
    margin-bottom: 20px;
}

.goods-info {
    display: flex;
    align-items: flex-start;
}

.goods-image {
    width: 80px;
    height: 80px;
    margin-right: 10px;
}

.goods-detail {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.goods-name {
    font-weight: bold;
}

.goods-price {
    color: #ff4d4f;
    font-weight: bold;
}

.goods-category,
.goods-time {
    color: #666;
    font-size: 12px;
}

.pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}
</style>
