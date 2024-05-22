using Microsoft.AspNetCore.Mvc;

namespace LucyCover___Backend.Controllers
{
    [ApiController]
    [Route("/api/patients")]
    public class PatientController : Controller
    {
        [HttpGet]
        public IActionResult GetPatients()
        {
            List<object> patients = new List<object>
            {
                new {
                    id = "p1",
                    firstName = "Barbara",
                    lastName = "Kret",
                    city = "Jelenia Góra",
                    address = "Wolności 31B",
                    province = "Dolnośląskie",
                    zipCode = "58-560",
                    phoneNumber = "607 411 432",
                    email = "Krecik@wp.pl",
                    birthDate = "1996-04-04",
                    birthPlace = "Jelenia Góra",
                },
                new {
                    id = "p2",
                    firstName = "Nicola",
                    lastName = "Prokosz",
                    city = "Jelenia Góra",
                    address = "Lubańska 7",
                    province = "Dolnośląskie",
                    zipCode = "58-560",
                    phoneNumber = "526 765 342",
                    email = "prokosz34@outlook.com",
                    birthDate = "1987-02-11",
                    birthPlace = "Jelenia Góra",
                },

            };

            return Ok(patients);

        }
    }
}
