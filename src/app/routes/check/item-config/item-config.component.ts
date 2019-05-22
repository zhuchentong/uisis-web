import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core'
import { NzModalRef, NzMessageService, NzTreeComponent, NzModalService } from 'ng-zorro-antd'
import { _HttpClient } from '@delon/theme'
import { STColumn } from '@delon/abc'
import { CheckItemConfigService } from 'app/services/check-item-config.service'
import { SFSchema, SFComponent } from '@delon/form'
import { CheckItemModel } from 'app/model/check-item.model'
import { NgTemplateOutlet } from '@angular/common'
import { Model } from 'app/model'

@Component({
  selector: 'app-check-item-config',
  templateUrl: './item-config.component.html',
  providers: [CheckItemConfigService]
})
export class CheckItemConfigComponent implements OnInit {
  @ViewChild('nzTreeComponent')
  tree: NzTreeComponent

  @ViewChild('checkItemFormComponent')
  checkItemFormComponent: TemplateRef<any>

  @ViewChild('sf')
  sf: SFComponent
  // 节点数据
  public treeData = []
  // 检查项数据
  public checkItemDataSet = []
  // 当前节点
  public selectedCheckPath: CheckItemModel

  // 表格结构
  public columns: STColumn[] = [
    { title: '检查编号', index: 'itemNumber', width: 120, className: 'text-center' },
    { title: '检查要点', index: 'itemPoint', render: 'item-point', width: '100px' },
    { title: '检查标题', index: 'itemTitle', render: 'item-title' },
    { title: '风险等级', index: 'riskLevel', width: 120, className: 'text-center' },
    {
      title: '操作',
      fixed: 'right',
      width: 200,
      className: 'text-center',
      buttons: [
        { text: '修改', type: 'none', click: x => this.onModify('ITEM', x) },
        { text: '删除', type: 'del', click: x => this.onDelete('ITEM', x.id) }
      ]
    }
  ]

  // 表单默认数据
  public formData = {}

  // 表单结构
  public schema: SFSchema = {
    properties: {
      id: {
        type: 'string',
        ui: {
          hidden: true
        }
      },
      type: {
        type: 'string',
        ui: {
          hidden: true
        }
      },
      itemTitle: {
        type: 'string',
        title: '检查名称'
      },
      itemNumber: {
        type: 'string',
        title: '检查编号'
      },
      itemPoint: {
        type: 'string',
        title: '检查要点',
        ui: {
          visibleIf: {
            type: ['ITEM']
          }
        }
      },

      riskLevel: {
        type: 'number',
        title: '风险等级',
        minimum: 1,
        maximum: 6,
        ui: {
          visibleIf: {
            type: ['ITEM']
          }
        }
      }
    },
    required: ['itemNumber', 'itemPoint', 'itemTitle', 'riskLevel']
  }

  constructor(
    private checkItemConfigService: CheckItemConfigService,
    private messageService: NzMessageService,
    private modalService: NzModalService
  ) {}

  ngOnInit() {
    this.getCheckPath()
  }

  /**
   * 获取节点列表
   */
  public getCheckPath() {
    this.checkItemConfigService.getAll().subscribe(data => {
      const generateTree = node => {
        node.title = node.itemNumber + ' ' + node.itemTitle
        node.key = node.id
        const children = data.filter(x => x.type === 'PATH').filter(x => x.parentId && x.parentId === node.id)
        if (children && children.length) {
          node.children = children
          node.children.forEach(generateTree)
        } else {
          node.isLeaf = true
        }
      }

      const rootList = data.filter(x => !x.parentId)
      rootList.forEach(generateTree)
      this.treeData = [...rootList]
    })
  }

  /**
   * 获取节点选择项
   */
  public getCheckItem() {
    this.checkItemConfigService.findByParentId(this.selectedCheckPath.id).subscribe(data => {
      this.checkItemDataSet = data.filter(x => x.type === 'ITEM')
    })
  }

  /**
   * 更新选择节点
   */
  public onSelectNode({ node }) {
    if (!node || !node.origin) {
      return
    }
    this.selectedCheckPath = node.origin
    this.getCheckItem()
  }

  /**
   * 添加数据
   */
  public onCreate(type: 'ITEM' | 'PATH') {
    this.formData = { type }
    const title = { ITEM: '创建检查项', PATH: '创建节点' }[type]

    this.modalService.create({
      nzTitle: title,
      nzContent: this.checkItemFormComponent,
      nzOnOk: () => {
        if (!this.sf.valid) {
          this.messageService.error('请确认输入信息正确')
          return false
        }

        const model = Model.from(CheckItemModel, this.sf.value)
        model.type = type
        model.parentId = this.selectedCheckPath.id

        this.checkItemConfigService.create(model).subscribe(() => {
          this.refreshCheck(type)
          this.messageService.success('创建成功')
        })
      }
    })
  }

  /**
   * 修改数据
   */
  public onModify(type: 'ITEM' | 'PATH', node) {
    node = node || this.selectedCheckPath
    this.formData = Model.from(CheckItemModel, node)
    const title = { ITEM: '编辑检查项', PATH: '编辑节点' }[type]

    this.modalService.create({
      nzTitle: title,
      nzContent: this.checkItemFormComponent,
      nzOnOk: () => {
        if (!this.sf.valid) {
          this.messageService.error('请确认输入信息正确')
          return false
        }

        const model = Model.from(CheckItemModel, this.sf.value)
        model.type = type

        this.checkItemConfigService.modify(model).subscribe(() => {
          this.refreshCheck(type)
          this.messageService.success('更新成功')
        })
      }
    })
  }

  /**
   * 删除数据
   */
  public onDelete(type: 'ITEM' | 'PATH', id?) {
    id = id || this.selectedCheckPath.id
    this.checkItemConfigService.delete(id).subscribe(() => {
      this.refreshCheck(type)
      this.messageService.success('删除成功')
    })
  }

  /**
   * 刷新数据
   */
  public refreshCheck(type: 'ITEM' | 'PATH') {
    const refrsh = {
      ITEM: () => this.getCheckItem(),
      PATH: () => this.getCheckPath()
    }[type]

    if (refrsh) {
      refrsh()
    }
  }
}
