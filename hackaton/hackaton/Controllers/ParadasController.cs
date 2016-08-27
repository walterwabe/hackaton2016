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
    public class ParadasController : Controller
    {
        private HackatonEntities db = new HackatonEntities();

        //
        // GET: /Paradas/

        public ActionResult Index()
        {
            var paradas = db.Paradas.Include(p => p.Ruta);
            return View(paradas.ToList());
        }

        //
        // GET: /Paradas/Details/5

        public ActionResult Details(int id = 0)
        {
            Parada parada = db.Paradas.Find(id);
            if (parada == null)
            {
                return HttpNotFound();
            }
            return View(parada);
        }

        //
        // GET: /Paradas/Create

        public ActionResult Create()
        {
            ViewBag.Id_Ruta = new SelectList(db.Rutas, "Id", "Nombre");
            return View();
        }

        //
        // POST: /Paradas/Create

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Parada parada)
        {
            if (ModelState.IsValid)
            {
                db.Paradas.Add(parada);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.Id_Ruta = new SelectList(db.Rutas, "Id", "Nombre", parada.Id_Ruta);
            return View(parada);
        }

        //
        // GET: /Paradas/Edit/5

        public ActionResult Edit(int id = 0)
        {
            Parada parada = db.Paradas.Find(id);
            if (parada == null)
            {
                return HttpNotFound();
            }
            ViewBag.Id_Ruta = new SelectList(db.Rutas, "Id", "Nombre", parada.Id_Ruta);
            return View(parada);
        }

        //
        // POST: /Paradas/Edit/5

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(Parada parada)
        {
            if (ModelState.IsValid)
            {
                db.Entry(parada).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.Id_Ruta = new SelectList(db.Rutas, "Id", "Nombre", parada.Id_Ruta);
            return View(parada);
        }

        //
        // GET: /Paradas/Delete/5

        public ActionResult Delete(int id = 0)
        {
            Parada parada = db.Paradas.Find(id);
            if (parada == null)
            {
                return HttpNotFound();
            }
            return View(parada);
        }

        //
        // POST: /Paradas/Delete/5

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Parada parada = db.Paradas.Find(id);
            db.Paradas.Remove(parada);
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