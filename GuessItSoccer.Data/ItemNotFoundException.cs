using System;

namespace GuessItSoccer.Data
{
    public class ItemNotFoundException<T> : Exception
    {   
        public ItemNotFoundException(long id)
        {
            throw new NotImplementedException();
        }

        public ItemNotFoundException()
        {
            throw new NotImplementedException();
        }
    }
}