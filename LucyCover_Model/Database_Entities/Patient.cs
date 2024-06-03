﻿using System.ComponentModel.DataAnnotations;
namespace LucyCover_Model.Database_Model
{
    public class Patient
    {
        [Required]
        [Key]
        public Guid id { get; set; }

        [Required]
        [MaxLength(50)]
        public string firstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string lastName { get; set; }

        [Required]
        [MaxLength(50)]
        public string city { get; set; }

        [Required]
        [MaxLength(50)]
        public string address { get; set; }

        [Required]
        [MaxLength(20)]
        public string province { get; set; }

        [Required]
        [MaxLength(10)]
        public string zipCode { get; set; }

        [Required]
        [MaxLength(30)]
        public string phoneNumber { get; set; }

        [Required]
        [MaxLength(50)]
        public string email { get; set; }

        [Required]
        [MaxLength(20)]
        public string birthDate { get; set; }

        [Required]
        [MaxLength(50)]
        public string BirthPlace { get;set; }

    }
}