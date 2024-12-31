using FluentAssertions;
using LucyCover___Backend.ExtensionMethods;
using LucyCover_Model.Database_Entities;
using LucyCover_Model.Database_Model;

namespace LucyCover___Tests.ExtensionMethods
{
    public class ExtensionMethods
    {
        public ExtensionMethods() { }

        [Fact]
        public void AddSalt_ForAnyString_ReturnStringAmongSalt()
        {
            //arrange
                var fakeString="test";
                var fakeSalt = "SaLt";
                var expected = "SaLttestSaLt";
            //act
                var saltString = fakeString.AddSalt(fakeSalt);
            //assert
                saltString.Should().Be(expected);
        }

        [Fact]
        public void ForCurrentUserOnly_ForICurrentUserDependentEntity_ReturnEntityCollection()
        {
            //arrange
                var fakeUserId = Guid.NewGuid();
                List<FakeEntity> fakeEntities = new List<FakeEntity>()
                {
                    new FakeEntity {patient=new Patient{userId = fakeUserId}, id=1},
                    new FakeEntity {patient=new Patient{userId = Guid.NewGuid()}, id=2},
                    new FakeEntity {patient=new Patient{userId = fakeUserId}, id=3},
                };
            //act
                var filteredCollection = fakeEntities.ForCurrentUserOnly(fakeUserId);
                
            //assert
                filteredCollection.Should().HaveCount(2);
                filteredCollection.Should().Contain(e => e.id == 1);
                filteredCollection.Should().Contain(e => e.id == 3);
        }

        private class FakeEntity : ICurrentUserDependentEntity
        {
            internal FakeEntity() { }
            public Patient patient { get; set; }
            public int id { get; set; }
        }
    }


}
