using LucyCover_Model.Database_Entities;
using SoftFluent.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LucyCover_Model.Database_Model
{
    public class Patient : IDbEntity
    {
        [Key]
        public Guid id { get; set; }

        [Required(AllowEmptyStrings = false)]
        [Encrypted]
        public string firstName { get; set; }

        [Required(AllowEmptyStrings = false)]
        [Encrypted]
        public string lastName { get; set; }

        [Required]
        [Encrypted]
        public string city { get; set; }

        [Required]
        [Encrypted]
        public string address { get; set; }

        [Required]
        [Encrypted]
        public string province { get; set; }

        [Required]
        [Encrypted]
        public string zipCode { get; set; }

        [Required]
        [Encrypted]
        public string phoneNumber { get; set; }

        [Required]
        [Encrypted]
        public string email { get; set; }

        [Required]
        [Encrypted]
        public string birthDate { get; set; }

        [Required]
        [Encrypted]
        public string birthPlace { get;set; }

        [Required]
        public Guid userId{ get; set; }

        [ForeignKey(nameof(userId))]
        public User? user { get;set;}

        public ICollection<Children> children { get; set; }

        public ICollection<Schedule> schedules { get; set; }

    }
}