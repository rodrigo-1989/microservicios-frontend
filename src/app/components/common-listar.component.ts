import { Directive, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Generic } from '../models/generic';
import { CommonService } from '../services/common.service';

@Directive()
export abstract class CommonListarComponent<E extends Generic ,S extends CommonService<E>> implements OnInit {

   titulo: string ;
   lista: E[] = [];
   protected nombreModel: string;

   totalRegistros = 0;
   paginaActual = 0;
   totalPorPagina = 4;
   @ViewChild(MatPaginator) paginator:MatPaginator;

  constructor(protected service: S) { }

  ngOnInit(): void {
    this.calcularRangos();
  }

  paginar(event: PageEvent):void {
      this.paginaActual = event.pageIndex;
      this.totalPorPagina = event.pageSize;
      this.calcularRangos();
  }

  private calcularRangos(){
    this.service.listarPaginas(this.paginaActual.toString(),this.totalPorPagina.toString())
      .subscribe( p =>{
        this.lista = p.content as E[];
        this.totalRegistros = p.totalElements as number;
        this.paginator._intl.itemsPerPageLabel = 'Registros por pagina: '
      });
  }

  public eliminar(e:E): void{
    Swal.fire({
      title: 'Cuidado *_*',
      text: `Seguro que desea eliminar a ${e.nombre} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminar(e.id).subscribe(()=>{
          this.calcularRangos();
        });
        Swal.fire(
          'Borrado!',
          `${e.nombre} a sido eliminad@!`,
          'success'
        )
      }
    });
  }

}
