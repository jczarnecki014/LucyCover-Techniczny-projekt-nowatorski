using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LucyCover_EncryptionSystem
{
    [AttributeUsage(AttributeTargets.Property)]
    public class SensitiveDataAttribute  : Attribute
    {
    }
}
