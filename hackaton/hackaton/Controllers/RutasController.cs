using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using hackaton.Models;

namespace hackaton.Controllers
{
    public class RutasController : Controller
    {
        private HackatonEntities db = new HackatonEntities();

        //
        // GET: /Rutas/

        public ActionResult Index()
        {
            return View(db.Rutas.ToList());
        }

        //
        // GET: /Rutas/Details/5

        public ActionResult Details(int id = 0)
        {
            Ruta ruta = db.Rutas.Find(id);
            if (ruta == null)
            {
                return HttpNotFound();
            }
            return View(ruta);
        }

        //
        // GET: /Rutas/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /Rutas/Create

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Ruta ruta)
        {
            if (ModelState.IsValid)
            {
                db.Rutas.Add(ruta);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(ruta);
        }


        [HttpPost]
        public ActionResult CreateRuta(String nombre, String origenNombre, String destinoNombre, String origen, String destino, String Frecuencia)
        {

            Ruta ruta = new Ruta();
            ruta.Nombre = nombre;

            if (ModelState.IsValid)
            {
                
                //ruta.Destino = destino;
                //ruta.Origen = origen;
                ruta.Destino_Nombre = destinoNombre;
                ruta.Origen_Nombre = origenNombre;
                ruta.FrecuenciaMin = Int16.Parse(Frecuencia);
                db.Rutas.Add(ruta);
                db.SaveChanges();
                //return RedirectToAction("Index");
            }

            return Json(ruta.Id, JsonRequestBehavior.AllowGet); ;
        }

        //
        // GET: /Rutas/Edit/5

        public ActionResult Edit(int id = 0)
        {
            Ruta ruta = db.Rutas.Find(id);
            if (ruta == null)
            {
                return HttpNotFound();
            }
            return View(ruta);
        }

        //
        // POST: /Rutas/Edit/5

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(Ruta ruta)
        {
            if (ModelState.IsValid)
            {
                db.Entry(ruta).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(ruta);
        }

        //
        // GET: /Rutas/Delete/5

        public ActionResult Delete(int id = 0)
        {
            Ruta ruta = db.Rutas.Find(id);
            if (ruta == null)
            {
                return HttpNotFound();
            }
            return View(ruta);
        }

        //
        // POST: /Rutas/Delete/5

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Ruta ruta = db.Rutas.Find(id);
            db.Rutas.Remove(ruta);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}