import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames';

// Bootstrap
import { Collapse, UncontrolledTooltip } from 'reactstrap'

// CKEditor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    ClassicEditor,
    AccessibilityHelp,
    Autoformat,
    AutoImage,
    Autosave,
    BalloonToolbar,
    BlockQuote,
    Bold,
    Essentials,
    FullPage,
    GeneralHtmlSupport,
    Heading,
    HtmlComment,
    HtmlEmbed,
    ImageBlock,
    ImageCaption,
    ImageInline,
    ImageInsert,
    ImageInsertViaUrl,
    ImageResize,
    ImageStyle,
    ImageTextAlternative,
    ImageToolbar,
    ImageUpload,
    Indent,
    IndentBlock,
    Italic,
    Link as LinkURL,
    LinkImage,
    List,
    ListProperties,
    MediaEmbed,
    Paragraph,
    PasteFromOffice,
    PictureEditing,
    SelectAll,
    ShowBlocks,
    SourceEditing,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TextTransformation,
    TodoList,
    Underline,
    Undo
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

// Import Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faChevronLeft, faPlus, faPlusCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import infoIcon from '../../assets/icons/InfoIcon'
import TypeItem from '../TypeItem/TypeItem';
import { uploadImage } from '../Upload';
import { createProduct } from '../../service/ProductAAPI';
import { createSupplier } from '../../service/SuppliersAPI';
import { toast } from 'react-toastify';

const CreateSupplier = () => {
    // const [dataBody, setDataBody] = useState({
    //     sub_id: null,
    //     name: null,
    //     unit: null,
    //     cost_price: null,
    //     wholesale_price: null,
    //     retail_price: null,
    //     images: [],
    //     types: [],
    //     category_id: null,
    //     brand_id: null,
    //     tags: null,
    //     description: null,
    //     status: "INACTIVE"
    // });

    const [dataBody, setDataBody] = useState({
        "sub_id": null,
        "name": null,
        "phone": null,
        "email": null,
        "address": null,
        "supplier_group_id": null,
        "tags": null,
        status: "INACTIVE"
    });

    const hanleCreateSupplier = async () => {

        console.log(">> check data: ", dataBody)
        // Cập nhật `dataBody` với các hình ảnh đã được tải lên
        setDataBody(prevState => ({
            ...prevState,
        }));

        // Sau khi tất cả ảnh đã được tải lên, gọi API để tạo sản phẩm
        const response = await createSupplier({
            ...dataBody,
        });

        if (response.status_code === +201) {
            console.log("success!!!")
            toast.success("tạo mới supplier thành công")
        }
        console.log("success!!!")
        toast.success("tạo mới supplier thành công")

    };

    const [isOpenEditor, setIsOpenEditor] = useState(false)

    const editorConfig = {
        language: 'vi',
        toolbar: {
            items: [
                'undo',
                'redo',
                '|',
                'sourceEditing',
                'showBlocks',
                '|',
                'heading',
                '|',
                'bold',
                'italic',
                'underline',
                '|',
                'link',
                'insertImage',
                'mediaEmbed',
                'insertTable',
                'blockQuote',
                'htmlEmbed',
                '|',
                'bulletedList',
                'numberedList',
                'todoList',
                'outdent',
                'indent'
            ],
            shouldNotGroupWhenFull: false
        },
        plugins: [
            AccessibilityHelp,
            Autoformat,
            AutoImage,
            Autosave,
            BalloonToolbar,
            BlockQuote,
            Bold,
            Essentials,
            FullPage,
            GeneralHtmlSupport,
            Heading,
            HtmlComment,
            HtmlEmbed,
            ImageBlock,
            ImageCaption,
            ImageInline,
            ImageInsert,
            ImageInsertViaUrl,
            ImageResize,
            ImageStyle,
            ImageTextAlternative,
            ImageToolbar,
            ImageUpload,
            Indent,
            IndentBlock,
            Italic,
            LinkURL,
            LinkImage,
            List,
            ListProperties,
            MediaEmbed,
            Paragraph,
            PasteFromOffice,
            PictureEditing,
            SelectAll,
            ShowBlocks,
            SourceEditing,
            Table,
            TableCaption,
            TableCellProperties,
            TableColumnResize,
            TableProperties,
            TableToolbar,
            TextTransformation,
            TodoList,
            Underline,
            Undo
        ],
        balloonToolbar: ['bold', 'italic', '|', 'link', 'insertImage', '|', 'bulletedList', 'numberedList'],
        heading: {
            options: [
                {
                    model: 'paragraph',
                    title: 'Paragraph',
                    class: 'ck-heading_paragraph'
                },
                {
                    model: 'heading1',
                    view: 'h1',
                    title: 'Heading 1',
                    class: 'ck-heading_heading1'
                },
                {
                    model: 'heading2',
                    view: 'h2',
                    title: 'Heading 2',
                    class: 'ck-heading_heading2'
                },
                {
                    model: 'heading3',
                    view: 'h3',
                    title: 'Heading 3',
                    class: 'ck-heading_heading3'
                },
                {
                    model: 'heading4',
                    view: 'h4',
                    title: 'Heading 4',
                    class: 'ck-heading_heading4'
                },
                {
                    model: 'heading5',
                    view: 'h5',
                    title: 'Heading 5',
                    class: 'ck-heading_heading5'
                },
                {
                    model: 'heading6',
                    view: 'h6',
                    title: 'Heading 6',
                    class: 'ck-heading_heading6'
                }
            ]
        },
        htmlSupport: {
            allow: [
                {
                    name: /^.*$/,
                    styles: true,
                    attributes: true,
                    classes: true
                }
            ]
        },
        image: {
            toolbar: [
                'toggleImageCaption',
                'imageTextAlternative',
                '|',
                'imageStyle:inline',
                'imageStyle:wrapText',
                'imageStyle:breakText',
                '|',
                'resizeImage',
                '|',
                'ckboxImageEdit'
            ]
        },
        link: {
            addTargetToExternalLinks: true,
            defaultProtocol: 'https://',
            decorators: {
                toggleDownloadable: {
                    mode: 'manual',
                    label: 'Downloadable',
                    attributes: {
                        download: 'file'
                    }
                }
            }
        },
        list: {
            properties: {
                styles: true,
                startIndex: true,
                reversed: true
            }
        },
        table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleDrop = (e) => {
        e.preventDefault();
        handleImages(e);
    };

    const [isInitialStock, setIsInitialStock] = useState(false)

    const [isTypes, setIsTypes] = useState(false);
    const [types, setTypes] = useState([]);

    useEffect(() => {
        if (isTypes) {
            setTypes([{
                name: "",
                value: ""
            }])
        } else {
            setTypes([]);
        }
    }, [isTypes])

    const addType = () => {
        setTypes([...types, {
            name: "",
            value: ""
        }])
    }

    const deleteType = (index) => {
        setTypes(prev => prev.filter((_, i) => i !== index));
    }

    const updateType = (index, name, value) => {
        const updatedTypes = [...types];
        updatedTypes[index] = { ...updatedTypes[index], [name]: value }

        setDataBody(prevState => {
            return {
                ...prevState,
                types: updatedTypes
            }
        });
        setTypes(updatedTypes);
    }

    return (
        <>
            <div className="right__navbar">
                <div className="box-navbar">
                    <div className="btn-toolbar">
                        <Link to='/admin/suppliers' className='btn-back'>
                            <FontAwesomeIcon icon={faChevronLeft} />
                            <h6 className="btn-back__title">
                                Quay lại danh sách nhà cung cấp
                            </h6>
                        </Link>
                    </div>
                    <div className="btn-toolbar">
                        <button className="btn btn-outline-primary">
                            <span className="btn__title">Thoát</span>
                        </button>
                        <button className="btn btn-primary" onClick={hanleCreateSupplier}>
                            <span className="btn__title">Lưu</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="right__createObjectPage">
                <div className="right__createObjectPage-wrapper">
                    <div className="right__createObjectPage-container">
                        <div className="box-maininfo">
                            <div className="box-info-item box-general">
                                <div className="info-header">
                                    <div className="box-header">
                                        <h6>Thông tin chung</h6>
                                    </div>
                                </div>
                                <div className="info-content">
                                    <div className="grid-container">
                                        <div className="box-product-name">
                                            <div className="form-item">
                                                <label htmlFor="name" className="form-label">
                                                    Tên nhà cung cấp
                                                    <span
                                                        id='name'
                                                        className="caption-icon"
                                                    >
                                                        {infoIcon}
                                                    </span>
                                                    <UncontrolledTooltip
                                                        placement="top"
                                                        target="name"
                                                    >
                                                        Tên nhà cung cấp
                                                    </UncontrolledTooltip>
                                                    <span className="asterisk-icon">*</span>
                                                </label>
                                                <div className="form-textfield">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        id="name"
                                                        placeholder='Nhập tên sản phẩm'
                                                        onChange={e => setDataBody(prevState => ({
                                                            ...prevState,
                                                            name: e.target.value
                                                        }))}
                                                    />
                                                    <fieldset className="input-field"></fieldset>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="box-product-id">
                                            <div className="form-item">
                                                <label htmlFor="id" className="form-label">
                                                    Mã nhà cung cấp
                                                    <span
                                                        id='sub_id'
                                                        className="caption-icon"
                                                    >
                                                        {infoIcon}
                                                    </span>
                                                    <UncontrolledTooltip
                                                        placement="top"
                                                        target="sub_id"
                                                    >
                                                        Mã <strong>không trùng lặp</strong> để định danh giữa các sản phẩm.<br />
                                                        Nếu để trống trường này, mã sản phẩm sẽ được tự sinh với <strong>tiền tố PVN</strong>
                                                    </UncontrolledTooltip>
                                                </label>
                                                <div className="form-textfield">
                                                    <input
                                                        type="text"
                                                        name="sub_id"
                                                        id="sub_id"
                                                        onChange={e => setDataBody(prevState => ({
                                                            ...prevState,
                                                            sub_id: e.target.value
                                                        }))} />
                                                    <fieldset className="input-field"></fieldset>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="box-product-unit">
                                            <div className="form-item">
                                                <label htmlFor="supplier_group_id" className="form-label">
                                                    Nhóm nhà cung cấp
                                                </label>
                                                <div className="form-textfield">
                                                    <input
                                                        type="text"
                                                        name="supplier_group_id"
                                                        id="supplier_group_id"
                                                        onChange={e => setDataBody(prevState => {
                                                            return {
                                                                ...prevState,
                                                                supplier_group_id: e.target.value
                                                            }
                                                        })} />
                                                    <fieldset className="input-field"></fieldset>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="box-product-phone">
                                            <div className="form-item">
                                                <label htmlFor="phone" className="form-label">
                                                    Số điện thoại
                                                </label>
                                                <div className="form-textfield">
                                                    <input
                                                        type="text"
                                                        name="phone"
                                                        id="phone"
                                                        onChange={e => setDataBody(prevState => {
                                                            return {
                                                                ...prevState,
                                                                phone: e.target.value
                                                            }
                                                        })} />
                                                    <fieldset className="input-field"></fieldset>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="box-product-email">
                                            <div className="form-item">
                                                <label htmlFor="email" className="form-label">
                                                    Email
                                                </label>
                                                <div className="form-textfield">
                                                    <input
                                                        type="text"
                                                        name="email"
                                                        id="email"
                                                        onChange={e => setDataBody(prevState => {
                                                            return {
                                                                ...prevState,
                                                                email: e.target.value
                                                            }
                                                        })} />
                                                    <fieldset className="input-field"></fieldset>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="box-product-address">
                                            <div className="form-item">
                                                <label htmlFor="address" className="form-label">
                                                    Địa chỉ
                                                </label>
                                                <div className="form-textfield">
                                                    <input
                                                        type="text"
                                                        name="address"
                                                        id="address"
                                                        onChange={e => setDataBody(prevState => {
                                                            return {
                                                                ...prevState,
                                                                address: e.target.value
                                                            }
                                                        })} />
                                                    <fieldset className="input-field"></fieldset>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box-subinfo">
                            <div className="box-info-item">
                                <div className="info-header">
                                    <div className="box-header">
                                        <h6>Thông tin khác</h6>
                                    </div>
                                </div>
                                <div className="info-content">
                                    <div className="form-item">
                                        <label htmlFor="category" className="form-label">
                                            Loại sản phẩm
                                        </label>
                                        <div className="box-select">
                                            <button id='category' className="btn-select">
                                                Chọn loại sản phẩm
                                                <FontAwesomeIcon icon={faCaretDown} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="form-item">
                                        <label htmlFor="tags" className="form-label">
                                            Mô tả
                                            <span
                                                id='tagsCaption'
                                                className="caption-icon"
                                            >
                                                {infoIcon}
                                            </span>
                                            <UncontrolledTooltip
                                                placement="top"
                                                target="tagsCaption"
                                            >
                                                Thêm thẻ cho sản phẩm
                                            </UncontrolledTooltip>
                                        </label>
                                        <div className="form-textfield">
                                            <input
                                                className='text-end'
                                                type="text"
                                                name="tags"
                                                id="tags"
                                                onChange={e => setDataBody(prevState => {
                                                    return {
                                                        ...prevState,
                                                        tags: e.target.value
                                                    }
                                                })}
                                            />
                                            <fieldset className="input-field"></fieldset>
                                        </div>
                                    </div>
                                    <div className="form-item">
                                        <label htmlFor="tags" className="form-label">
                                            Tags
                                            <span
                                                id='tagsCaption'
                                                className="caption-icon"
                                            >
                                                {infoIcon}
                                            </span>
                                            <UncontrolledTooltip
                                                placement="top"
                                                target="tagsCaption"
                                            >
                                                Thêm thẻ cho sản phẩm
                                            </UncontrolledTooltip>
                                        </label>
                                        <div className="form-textfield">
                                            <input
                                                className='text-end'
                                                type="text"
                                                name="tags"
                                                id="tags"
                                                onChange={e => setDataBody(prevState => {
                                                    return {
                                                        ...prevState,
                                                        tags: e.target.value
                                                    }
                                                })}
                                            />
                                            <fieldset className="input-field"></fieldset>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateSupplier