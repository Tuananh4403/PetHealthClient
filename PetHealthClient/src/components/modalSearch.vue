<template>
    <div
        class="modal fade"
        id="search_booking"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
    >
        <form id="list_booking">
            <div class="modal-dialog modal-md" role="document">
                <div class="modal-content">
                    <div class="modal-header d-flex align-items-center">
                        <h4 class="w-title" style="margin-bottom: 0 !important;">Tìm kiếm đơn hàng</h4>
                        <i class="fa fa-undo " aria-hidden="true" ref="clear_ref" @click="clear"></i>
                    </div>
                    <div class="modal-body">   
                        <div class="row">
                            <div class="form-group col-12">
                                <label class="font-weight-bold"
                                    >Mã/tên đơn hàng</label
                                >
                                <input
                                    v-model="order_info"
                                    id="order_info"
                                    name="order_info"
                                    type="text"
                                    class="form-control"
                                    placeholder="Nhập Mã/tên đơn hàng"
                                />
                               
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="form-group col-6">
                                <label class="font-weight-bold"
                                    >Tình trạng đơn hàng</label
                                >
                                <multiselect v-model="order_status" style="cursor: pointer" label="name" track-by="name"
                                    class="custom-input-select" selectLabel="" deselectLabel="" selectedLabel=""
                                    placeholder="Chọn tình trạng đơn hàng" :options="arrayStatus" :custom-label="customLabel">
                                    <template #tag="{ option, remove }">
                                        <span class="multiselect__tag" style="background: #22445d">
                                            <span class="font-weight-bold">{{
                                        option.name
                                    }}</span>
                                            <i tabindex="1" class="multiselect__tag-icon" @click="remove(option)"></i>
                                        </span>
                                    </template>
                                    <template #noResult>
                                        Không tìm thấy dữ liệu.
                                    </template>
                                </multiselect>
                               
                            </div>
                            <div class="form-group col-6">
                                <label class="font-weight-bold"
                                    >Loại đơn hàng</label
                                >
                                <multiselect v-model="order_type" style="cursor: pointer" label="name" track-by="name"
                                    class="custom-input-select" selectLabel="" deselectLabel="" selectedLabel=""
                                    placeholder="Chọn loại đơn hàng" :options="arrayType" :custom-label="customLabel">
                                    <template #tag="{ option, remove }">
                                        <span class="multiselect__tag" style="background: #22445d">
                                            <span class="font-weight-bold">{{
                                        option.name
                                    }}</span>
                                            <i tabindex="1" class="multiselect__tag-icon" @click="remove(option)"></i>
                                        </span>
                                    </template>
                                    <template #noResult>
                                        Không tìm thấy dữ liệu.
                                    </template>
                                </multiselect>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="form-group col-12">
                                <label class="font-weight-bold"
                                    >Người tạo</label
                                >
                                <input
                                    v-model="user_info"
                                    ref="user_info"
                                    id="user_info"
                                    name="user_info"
                                    type="text"
                                    class="form-control"
                                    :placeholder="`Nhập tên người tạo`"
                                />
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-12 text-center">
                                <span class="font-weight-bold">Ngày đặt</span>
                            </div>
                            <div class="form-group col-6 text-center">
                                <label for="from">Từ</label>
                                <div
                                    class="d-flex justify-content-between align-items-center start_date" v-set-coordinates
                                >
                                <datepicker
                                    v-model="created_at_from"
                                    ref="created_at_from"
                                    
                                    :config="datePickerConfig"
                                    :full-month-name="true"
                                    placeholder="Từ"
                                    format="yyyy-MM-dd"
                                    id="created_at_from"
                                    name="created_at_from"
                                    @selected="
                                        onSelectDateStart($event, 'from')
                                    "
                                >
                                </datepicker>
                                </div>
                            </div>
                            
                            <div class="form-group col-6 text-center">
                                <label for="to">Đến</label>
                                <div
                                    class="d-flex justify-content-between align-items-center start_date" v-set-coordinates
                                >
                                    <datepicker
                                        v-model="created_at_to"
                                        ref="created_at_to"
                                        :config="datePickerConfig"
                                        
                                        :full-month-name="true"
                                        placeholder="Đến"
                                        format="yyyy-MM-dd"
                                        id="started_at_to"
                                        name="started_at_to"
                                        @selected="onSelectDateStart($event, 'to')"
                                    >
                                    </datepicker>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 text-center">
                                <span class="font-weight-bold">Ngày giao</span>
                            </div>
                            <div class="form-group col-6 text-center">
                                <label for="from">Từ</label>
                                <div
                                    class="d-flex justify-content-between align-items-center date_completed" v-set-coordinates
                                >
                                <datepicker
                                    v-model="completed_at_from"
                                    ref="completed_at_from"
                                    
                                    :config="datePickerConfig"
                                    :full-month-name="true"
                                    placeholder="Từ"
                                    format="yyyy-MM-dd"
                                    id="completed_at_from"
                                    name="completed_at_from"
                                    @selected="
                                    onSelectDateComplete($event, 'from')
                                    "
                                >
                                </datepicker>
                                </div>
                            </div>
                            
                            <div class="form-group col-6 text-center">
                                <label for="to">Đến</label>
                                <div
                                    class="d-flex justify-content-between align-items-center date_completed" v-set-coordinates
                                >
                                    <datepicker
                                        v-model="completed_at_to"
                                        ref="completed_at_to"
                                        :config="datePickerConfig"
                                        
                                        :full-month-name="true"
                                        placeholder="Đến"
                                        format="yyyy-MM-dd"
                                        id="completed_at_to"
                                        name="completed_at_to"
                                        @selected="onSelectDateComplete($event, 'to')"
                                    >
                                    </datepicker>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary btn-close"
                            data-dismiss="modal"
                        >
                            Đóng
                        </button>
                        <button
                            ref="enterPress"
                            type="button"
                            class="btn btn-primary"
                            @click="btnConfirm"
                            data-dismiss="modal"
                        >
                            Tìm kiếm
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script lang="js">
import { th } from "date-fns/locale";
import Multiselect from "vue-multiselect";
export default {
    components: {
        Multiselect,
    },

    data() {
        return {
            isExport: false,
            request_info: "",
            order_info: "",
            order_status: "",
            order_type: "",
            user_info: "",
            created_at_from: null,
            created_at_to: null,
            completed_at_from: null,
            completed_at_to: null,
            datePickerConfig: {
                // Configurations for the datepicker
                // You can customize the options according to your needs
                locale: th,
                format: "yyyy-MM-dd",
                // Other options...
            },
            arrayStatus: [{
                value: 'review',
                name: 'Chưa duyệt'
            },
            {
                value: 'approval',
                name: 'Đã duyệt'
            },
            {
                value: 'completed',
                name: 'Hoàn tất'
            },
            {
                value: 'canceled',
                name: 'Đã hủy'
            },
            {
                value: 'finish',
                name: 'Hoàn thành'
            }],
            arrayType: [{
                value: '0',
                name: 'Đơn hàng múi'
            },
            {
                value: '1',
                name: 'Đơn hàng SA'
            },
            {   
                value: '2',
                name: 'Đơn hàng dự trữ'
            },
            {
                value: '3',
                name: 'Đơn hàng khách hàng'
            }],
            isSelecting: false,
        };
    },
    computed:{
        title(){
            return this.isExport ? "xuất": "nhập";
        }
    },
    methods: {
        onSelectDateStart(event, option) {
            this.isSelecting = false;
            if (option === "from") {
                this.started_at_from = event;
            } else {
                this.started_at_to = event;
            }
        },
        onSelectDateComplete(event, option) {
            this.isSelecting = false;
            if (option === "from") {
                this.completed_at_from = event;
            } else {
                this.completed_at_to = event;
            }
        },
        btnConfirm() {
            let data = {
                request_info: this.request_info || null,
                order_info: this.order_info || null,
                type: this.order_type?.value|| null,
                status: this.order_status?.value || null,
                user_info: this.user_info || null,
                created_at_from: this.created_at_from || null,
                created_at_to: this.created_at_to || null,
                date_complete_from: this.completed_at_from || null,
                date_complete_to: this.completed_at_to || null
            };
            let dataStorage = {
                request_info: this.request_info || null,
                order_info: this.order_info || null,
                order_type: this.order_type || null,
                order_status: this.order_status || null,
                user_info: this.user_info || null,
                created_at_from: this.created_at_from || null,
                created_at_to: this.created_at_to || null,
                completed_at_to: this.completed_at_to || null,
                completed_at_from: this.completed_at_from || null
            }
            localStorage.setItem(`'searchOrderSummary'`, JSON.stringify(dataStorage));

            this.emitter.emit("page/search", data);
            // $("#search_embroidery_inventory").modal("hide");
        },
        initData() {
            const searchOrderSummary = JSON.parse(localStorage.getItem(`'searchOrderSummary'`));
             if (searchOrderSummary) {
                this.request_info = searchOrderSummary.request_info || null
                this.order_info = searchOrderSummary.order_info || null
                this.order_type =  searchOrderSummary.order_type || null,
                this.order_status = searchOrderSummary.order_status || null,
                this.user_info = searchOrderSummary.user_info || null
                this.created_at_from = searchOrderSummary.created_at_from || null
                this.created_at_to = searchOrderSummary.created_at_to || null,
                this.completed_at_from = searchOrderSummary.completed_at_from || null,
                this.completed_at_to = searchOrderSummary.completed_at_to || null
            }
            this.isSelecting = false;
        },
        clear() {
            this.isSelecting = false;
            $(this.$refs.clear_ref)
                .css('transform', 'rotate(-360deg)')
                .css('-webkit-transform', 'rotate(-360deg)')
                .css('transition-duration', '0.5s')

            setTimeout(() => {
                $(this.$refs.clear_ref).css('transform', 'rotate(0deg)');
            }, 300);

            this.request_info = ""
            this.order_info = ""
            this.user_info = ""
            this.order_type = ""
            this.order_status = ""
            this.created_at_from = null
            this.created_at_to = null
            this.completed_at_from = null
            this.completed_at_to = null

            this.$refs.created_at_from.clearDate();
            this.$refs.created_at_to.clearDate();
            this.$refs.completed_at_from.clearDate();
            this.$refs.completed_at_to.clearDate();
            localStorage.removeItem(`'search${this.isExport? 'export':'import'}EmbroideryWH'`);
        },
        clearLocalStorage() {
            // Clear the local storage
            localStorage.clear();
        },
        handleEnter(e) {
            if (e.keyCode === 13) {
                if(!this.isSelecting  && !$('.btn-close').is(":focus")){
                    // e.preventDefault(); // Prevent form submission
                    
                    this.btnConfirm();
                    $('#search_order_summary').modal('hide'); // Manually hide the modal
                }
            }
        },
        customLabel({ name }) {
            return `${name}`;
        },
    },
    mounted()
    {
        window.addEventListener('beforeunload', this.clearLocalStorage);
        this.initData();
        $(document).on('keydown', '#search_order_summary', this.handleEnter);
    },
    beforeUnmount() {
        $(document).off('keydown', '#search_order_summary', this.handleEnter);
    },
    
    created() {
        // this.getProductionDepartment();
        this.isExport = $('#isExport').val() ?  true : false;
    },
    
    beforesUnmount() {
        // Remove the beforeunload event listener when the component is destroyed
        window.removeEventListener('beforeunload', this.clearLocalStorage);
    }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style>
.multiselect__option--highlight {
    background: #22445d !important;
}
.multiselect .multiselect__select {
    top: -2px !important;
}
.multiselect .multiselect__tags {
    min-height: 36px !important;
    border: 1px solid #22445d !important;
    padding: 6px 26px 0px 6px !important;
    overflow: hidden;
}
.multiselect .multiselect__tags .multiselect__tag {
    margin-bottom: 0px !important;
}
.multiselect .multiselect__tags .multiselect__placeholder {
    margin-bottom: 5px !important;
}
.multiselect__tag-icon:after {
    color: #ffffff;
}

.multiselect__element {
    cursor: not-allowed;
}
.multiselect__option--selected {
    background: #ebebeb;
    pointer-events: none;
}

.disabled-product-select-option .multiselect {
    pointer-events: none !important;
}
.disabled-product-select-option .multiselect .multiselect__tags {
    background: #e8e8e8 !important;
}

.dp__input_wrap .dp__input {
    height: 36px;
    border: 1px solid #22445d;
}
.dp__input_wrap .dp__input_icon {
    color: #22445d;
}
.dp__cell_inner.dp__cell_disabled {
    background: #f1f1f1;
    border-radius: 0px !important;
}
.dp__cell_inner.dp__active_date {
    background: #22445d;
}

.swal2-icon {
    margin: 20px auto 0px !important;
}
.swal2-styled {
    margin: 0px 5px !important;
}

.vuejs3-datepicker__value {
  width: 100%;
}
.vuejs3-datepicker {
  width: 100%;
}
</style>
