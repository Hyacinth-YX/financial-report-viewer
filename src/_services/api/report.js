/**
 * files模块接口列表
 * 关于阅读文章文件上传 获取文件名列表 显示文章内容
 */

import {instance} from '../utils/http'; // 导入http中创建的axios实例

const report = {
    getReportContent(announcementId){
        return instance.get(`/api/report/getReport?announcementId=${announcementId}`)
    },
    getAllSecInfo(start,offset){
        return instance.get(`/api/report/get_all_sec_info?start=${start}&offset=${offset}`)
    },
    getSecInfo(security){
        return instance.get(`/api/report/get_sec_info?security=${security}`)
    },
    getReportInfo(announcementId){
        return instance.get(`/api/report/getReportInfo?announcementId=${announcementId}`)
    },
    getRecentReportAnnouncementId(secCode){
        return instance.get(`/api/report/getRecentReportAnnouncementId?secCode=${secCode}`)
    },
    getAllRecentReportAnnouncementInfo(secCode){
        return instance.get(`/api/report/getAllRecentReportAnnouncementInfo?secCode=${secCode}`)
    },
    searchSecCodes(searchText){
        return instance.get(`/api/report/searchSecCodes?searchString=${searchText}`)
    },
    getAnnouncementOutline(announcementId){
        return instance.get(`/api/report/getAnnouncementOutline?announcementId=${announcementId}`)
    },
    testTemplate(){
        return instance.get(`/api/report/testTemplate`)
    },
    testJs(){
        return instance.get(`/api/report/testJs`)
    },
    reportTemplateJs(){
        return instance.get(`/api/report/reportTemplateJs`)
    }
    // 文章文件上传（pdf）binary （不允许重名文件）// 文件file为urf-8的txt文本
    // fileUpload(formdata) {
    //     return instance.post(`${host.first}/files/upload`, formdata, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     })
    //         .then(function() {
    //             console.log('SUCCESS!!');
    //             return true;
    //         })
    //         .catch(function () {
    //             console.log('FAILURE!!');
    //             return  false;
    //         });
    // },
    // // 获取所有上传成功了的文件名
    // getFileList() {
    //     return instance.get(`${host.first}/files/names`)
    // },
    // // 根据选择文件名，返回该文件中文章的内容 param:文件名
    // getFileContent(filename) {
    //     return instance.get(`${host.first}/files/content?name=${filename}`)
    // },
    // deleteFile(filename) {
    //     return instance.get(`${host.first}/files/deletefile?name=${filename}`)
    // }
}

export default report
